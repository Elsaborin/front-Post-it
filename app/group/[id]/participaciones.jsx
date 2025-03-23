import { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  PanResponder 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  Users, 
  UserCheck, 
  Star, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  X,
  UserX
} from 'lucide-react-native';

export default function ParticipacionesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // Estado para los participantes
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Hernández Primo Julián', participaciones: 5 },
    { id: 2, name: 'Hernández Primo Julián', participaciones: 7 },
    { id: 3, name: 'Hernández Primo Julián', participaciones: 1 },
    { id: 4, name: 'Hernández Primo Julián', participaciones: 0 },
    { id: 5, name: 'Hernández Primo Julián', participaciones: 0 },
    { id: 6, name: 'Hernández Primo Julián', participaciones: 0 },
  ]);

  // Estado para el filtro actual
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'participated', 'notParticipated'

  // Calcular estadísticas
  const participatedCount = participants.filter(p => p.participaciones > 0).length;
  const notParticipatedCount = participants.filter(p => p.participaciones === 0).length;

  // Filtrar participantes según el filtro activo
  const filteredParticipants = participants.filter(participant => {
    if (activeFilter === 'participated') {
      return participant.participaciones > 0;
    } else if (activeFilter === 'notParticipated') {
      return participant.participaciones === 0;
    }
    return true; // 'all'
  });

  // Función para incrementar participaciones
  const incrementParticipation = (id) => {
    setParticipants(prevParticipants => 
      prevParticipants.map(participant => 
        participant.id === id 
          ? { ...participant, participaciones: participant.participaciones + 1 } 
          : participant
      )
    );
  };

  // Función para decrementar participaciones
  const decrementParticipation = (id) => {
    setParticipants(prevParticipants => 
      prevParticipants.map(participant => 
        participant.id === id && participant.participaciones > 0
          ? { ...participant, participaciones: participant.participaciones - 1 } 
          : participant
      )
    );
  };

  // Componente de fila con gestos
  const ParticipantRow = ({ participant }) => {
    const swipeAnim = useRef(new Animated.Value(0)).current;
    const rowScale = useRef(new Animated.Value(1)).current;
    
    // Crear el PanResponder para detectar gestos de deslizamiento
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          // Efecto al iniciar el deslizamiento
          Animated.spring(rowScale, {
            toValue: 0.98,
            useNativeDriver: true,
          }).start();
        },
        onPanResponderMove: (evt, gestureState) => {
          // Limitar el deslizamiento a un rango razonable
          const newValue = Math.max(Math.min(gestureState.dx, 100), -100);
          swipeAnim.setValue(newValue);
        },
        onPanResponderRelease: (evt, gestureState) => {
          // Restaurar la escala
          Animated.spring(rowScale, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
          }).start();
          
          // Determinar la acción basada en la dirección y distancia
          if (gestureState.dx < -50) {
            // Deslizamiento a la izquierda - Incrementar
            incrementParticipation(participant.id);
            
            // Animación de éxito
            Animated.sequence([
              Animated.timing(swipeAnim, {
                toValue: -100,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.spring(swipeAnim, {
                toValue: 0,
                friction: 5,
                useNativeDriver: true,
              })
            ]).start();
          } else if (gestureState.dx > 50) {
            // Deslizamiento a la derecha - Decrementar
            decrementParticipation(participant.id);
            
            // Animación de éxito
            Animated.sequence([
              Animated.timing(swipeAnim, {
                toValue: 100,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.spring(swipeAnim, {
                toValue: 0,
                friction: 5,
                useNativeDriver: true,
              })
            ]).start();
          } else {
            // No se deslizó lo suficiente, volver a la posición inicial
            Animated.spring(swipeAnim, {
              toValue: 0,
              friction: 5,
              useNativeDriver: true,
            }).start();
          }
        },
      })
    ).current;

    // Calcular opacidad para los iconos de acción
    const leftActionOpacity = swipeAnim.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    });
    
    const rightActionOpacity = swipeAnim.interpolate({
      inputRange: [0, 20, 100],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.rowContainer}>
        {/* Indicador de acción izquierda (incrementar) */}
        <Animated.View 
          style={[
            styles.actionIndicator, 
            styles.leftAction,
            { opacity: leftActionOpacity }
          ]}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.actionText}>+1</Text>
        </Animated.View>
        
        {/* Indicador de acción derecha (decrementar) */}
        <Animated.View 
          style={[
            styles.actionIndicator, 
            styles.rightAction,
            { opacity: rightActionOpacity }
          ]}
        >
          <Minus size={20} color="#fff" />
          <Text style={styles.actionText}>-1</Text>
        </Animated.View>
        
        {/* Fila del participante */}
        <Animated.View 
          style={[
            styles.tableRow,
            { 
              transform: [
                { translateX: swipeAnim },
                { scale: rowScale }
              ] 
            }
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.studentName}>{participant.name}</Text>
          <Text style={styles.participationCount}>
            {participant.participaciones}
          </Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>post it!</Text>
        <Text style={styles.headerSubtitle}>Asignatura I Grupo</Text>
      </View>

      <View style={styles.statsContainer}>
        {/* Caja de alumnos que han participado */}
        <TouchableOpacity 
          style={styles.statBox}
          onPress={() => setActiveFilter(
            activeFilter === 'participated' ? 'all' : 'participated'
          )}
        >
          <View style={styles.iconContainer}>
            <UserCheck size={24} color={activeFilter === 'participated' ? "#53B668" : "#333"} />
          </View>
          <View style={[
            styles.statNumberContainer, 
            activeFilter === 'participated' && styles.activeStatContainer
          ]}>
            <Text style={styles.statNumber}>{participatedCount}</Text>
          </View>
          {activeFilter === 'participated' && (
            <View style={styles.activeFilterIndicator}>
              <Text style={styles.activeFilterText}>Han participado</Text>
            </View>
          )}
        </TouchableOpacity>
        
        {/* Caja de alumnos que no han participado */}
        <TouchableOpacity 
          style={styles.statBox}
          onPress={() => setActiveFilter(
            activeFilter === 'notParticipated' ? 'all' : 'notParticipated'
          )}
        >
          <View style={styles.iconContainer}>
            <UserX size={24} color={activeFilter === 'notParticipated' ? "#DD6565" : "#333"} />
          </View>
          <View style={[
            styles.statNumberContainer, 
            activeFilter === 'notParticipated' && styles.notParticipatedContainer
          ]}>
            <Text style={styles.statNumber}>{notParticipatedCount}</Text>
          </View>
          {activeFilter === 'notParticipated' && (
            <View style={[styles.activeFilterIndicator, styles.notParticipatedText]}>
              <Text style={styles.notParticipatedFilterText}>No han participado</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Indicador de filtro activo y botón para limpiar */}
      {activeFilter !== 'all' && (
        <TouchableOpacity 
          style={styles.clearFilterButton}
          onPress={() => setActiveFilter('all')}
        >
          <Text style={[
            styles.clearFilterText,
            activeFilter === 'notParticipated' && styles.notParticipatedClearText
          ]}>
            Mostrar todos
          </Text>
          <X size={16} color={activeFilter === 'participated' ? "#53B668" : "#DD6565"} />
        </TouchableOpacity>
      )}

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Alumno</Text>
        <Text style={styles.tableHeaderText}>Participaciones</Text>
      </View>

      <View style={styles.swipeInstructions}>
        <View style={styles.swipeInstruction}>
          <ChevronLeft size={16} color="#696999" />
          <Text style={styles.swipeInstructionText}>Desliza para sumar</Text>
        </View>
        <View style={styles.swipeInstruction}>
          <Text style={styles.swipeInstructionText}>Desliza para restar</Text>
          <ChevronRight size={16} color="#696999" />
        </View>
      </View>

      <ScrollView style={styles.tableContainer}>
        {filteredParticipants.length > 0 ? (
          filteredParticipants.map((participant) => (
            <ParticipantRow key={participant.id} participant={participant} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No hay alumnos que coincidan con el filtro actual
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Star size={24} color="#696999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FileText size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Users size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Righteous-Regular',
    letterSpacing: 0.5,
    color: '#000',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Righteous-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  statBox: {
    width: '45%',
    position: 'relative',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  statNumberContainer: {
    backgroundColor: '#696999',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
  activeStatContainer: {
    backgroundColor: '#53B668', // Verde para indicar filtro activo
  },
  notParticipatedContainer: {
    backgroundColor: '#DD6565', // Rojo para indicar filtro de no participación
  },
  statNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Righteous-Regular',
  },
  activeFilterIndicator: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  activeFilterText: {
    fontSize: 12,
    color: '#53B668',
    fontFamily: 'Righteous-Regular',
  },
  notParticipatedText: {
    color: '#DD6565',
  },
  notParticipatedFilterText: {
    fontSize: 12,
    color: '#DD6565',
    fontFamily: 'Righteous-Regular',
  },
  clearFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 5,
  },
  clearFilterText: {
    fontSize: 14,
    color: '#53B668',
    marginRight: 5,
    fontFamily: 'Righteous-Regular',
  },
  notParticipatedClearText: {
    color: '#DD6565',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Righteous-Regular',
  },
  swipeInstructions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  swipeInstruction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeInstructionText: {
    fontSize: 12,
    color: '#696999',
    fontFamily: 'Righteous-Regular',
  },
  tableContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  rowContainer: {
    position: 'relative',
    marginBottom: 6,
    marginHorizontal: 10,
    height: 50,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#696999',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    zIndex: 1,
    height: '100%',
  },
  studentName: {
    fontSize: 14,
    color: 'white',
    flex: 1,
    fontFamily: 'Righteous-Regular',
  },
  participationCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Righteous-Regular',
  },
  actionIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 0,
  },
  leftAction: {
    left: 0,
    backgroundColor: '#53B668', // Verde para incrementar
  },
  rightAction: {
    right: 0,
    backgroundColor: '#DD6565', // Rojo para decrementar
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 14,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Righteous-Regular',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
  },
});