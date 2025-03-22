import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import Header from '../../components/Header';

export default function AsistenciasScreen() {
  const attendanceData = [
    { percentage: 100, color: '#2ecc71' },
    { percentage: 92, color: '#e74c3c' },
    { percentage: 100, color: '#e74c3c' },
    { percentage: 100, color: '#f1c40f' },
  ];

  return (
    <View style={styles.container}>
      <Header title="Asistencias" />

      <View style={styles.unitsContainer}>
        <View style={[styles.unit, { backgroundColor: '#3498db' }]}>
          <Text style={styles.unitText}>Unidad 1</Text>
        </View>
        <View style={[styles.unit, { backgroundColor: '#e91e63' }]}>
          <Text style={styles.unitText}>2</Text>
        </View>
        <View style={[styles.unit, { backgroundColor: '#2ecc71' }]}>
          <Text style={styles.unitText}>3</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: '#2ecc71' }]}>
          <Text style={styles.statIcon}>👤</Text>
          <Text style={styles.statNumber}>20</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: '#e74c3c' }]}>
          <Text style={styles.statIcon}>❌</Text>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Faltas</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: '#f1c40f' }]}>
          <Text style={styles.statIcon}>⏰</Text>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Retardos</Text>
        </View>
      </View>

      {attendanceData.map((data, index) => (
        <View 
          key={index} 
          style={[styles.attendanceRow, { backgroundColor: data.color }]}
        >
          <Text style={styles.studentName}>Hernández Primo Julián</Text>
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageLabel}>Asistencias:</Text>
            <Text style={styles.percentageNumber}>{data.percentage}%</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  unitsContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  unit: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 16,
  },
  unitText: {
    color: '#fff',
    fontWeight: '500',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginBottom: 20,
  },
  statBox: {
    padding: 15,
    borderRadius: 8,
    width: '28%',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  attendanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  studentName: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  percentageContainer: {
    alignItems: 'flex-end',
  },
  percentageLabel: {
    color: 'white',
    fontSize: 14,
  },
  percentageNumber: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});