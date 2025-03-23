import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '../../../components/Header';
import { ChevronLeft } from 'lucide-react-native';

const students = [
  { name: 'Hernández Primo Julián', score: 89, color: '#3498db' },
  { name: 'Cutz Martinez Luis Daniel', score: 69, color: '#e74c3c' }
];

export default function CalificacionesScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Header title="Calificaciones">
        <View style={styles.header}>
          <ChevronLeft size={24} color="#696969" />
          <Text style={styles.headerText}>Grupo {id}</Text>
        </View>
      </Header>

      <ScrollView contentContainerStyle={styles.content}>
        {students.map((student, index) => (
          <View 
            key={index} 
            style={[styles.card, { backgroundColor: student.color }]}
          >
            <View style={styles.scoreContainer}>
              <Text style={styles.score}>{student.score}</Text>
            </View>
            <Text style={styles.name}>{student.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20
  },
  headerText: {
    fontSize: 20,
    color: '#696969',
    fontWeight: '600'
  },
  content: {
    padding: 20,
    gap: 15
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    elevation: 3
  },
  scoreContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  score: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333'
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    flex: 1
  }
});