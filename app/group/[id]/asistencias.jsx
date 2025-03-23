import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '../../../components/Header';
import { ChevronLeft } from 'lucide-react-native';

export default function AsistenciasScreen() {
  const { id } = useLocalSearchParams();

  // Datos de ejemplo
  const attendanceData = [
    { student: 'Estudiante 1', attendance: '100%', color: '#2ecc71' },
    { student: 'Estudiante 2', attendance: '85%', color: '#f1c40f' }
  ];

  return (
    <View style={styles.container}>
      <Header title="Asistencias">
        <View style={styles.headerContent}>
          <ChevronLeft size={24} color="#696999" />
          <Text style={styles.headerTitle}>Grupo {id}</Text>
        </View>
      </Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {attendanceData.map((data, index) => (
          <View 
            key={index} 
            style={[styles.attendanceCard, { backgroundColor: data.color }]}
          >
            <Text style={styles.studentName}>{data.student}</Text>
            <Text style={styles.attendanceText}>{data.attendance}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  headerTitle: {
    fontSize: 20,
    color: '#696999',
    fontWeight: '600'
  },
  scrollContent: {
    padding: 20,
    gap: 15
  },
  attendanceCard: {
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2
  },
  studentName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  attendanceText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700'
  }
});