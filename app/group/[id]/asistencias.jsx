// asistencias.jsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { UserCheck, UserX, Clock, User } from 'lucide-react-native';

export default function AsistenciasScreen() {
  const { id } = useLocalSearchParams();

  // Colores exactos proporcionados
  const colors = {
    present: '#53B668',  // Verde
    absent: '#DD6565',   // Rojo
    late: '#F0AD4E'      // Naranja
  };

  // Datos de asistencia
  const attendanceData = [
    { student: 'Hernández Primo Julián', attendance: '100%', status: 'present', color: colors.present },
    { student: 'Hernández Primo Julián', attendance: '92%', status: 'absent', color: colors.absent },
    { student: 'Hernández Primo Julián', attendance: '100%', status: 'absent', color: colors.absent },
    { student: 'Hernández Primo Julián', attendance: '100%', status: 'late', color: colors.late }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>post it!</Text>
        <Text style={styles.headerSubtitle}>Asignatura I Grupo</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <View style={styles.iconContainer}>
            <UserCheck size={24} color="#333" />
          </View>
          <View style={[styles.statNumberContainer, { backgroundColor: colors.present }]}>
            <Text style={styles.statNumber}>20</Text>
          </View>
        </View>
        
        <View style={styles.statBox}>
          <View style={styles.iconContainer}>
            <UserX size={24} color="#333" />
          </View>
          <View style={[styles.statNumberContainer, { backgroundColor: colors.absent }]}>
            <Text style={styles.statNumber}>3</Text>
          </View>
        </View>

        <View style={styles.statBox}>
          <View style={styles.iconContainer}>
            <Clock size={24} color="#333" />
          </View>
          <View style={[styles.statNumberContainer, { backgroundColor: colors.late }]}>
            <Text style={styles.statNumber}>1</Text>
          </View>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Alumno</Text>
        <Text style={styles.tableHeaderText}>Porcentaje</Text>
      </View>

      <ScrollView style={styles.tableContainer}>
        {attendanceData.map((data, index) => (
          <View key={index} style={[styles.tableRow, { backgroundColor: data.color }]}>
            <Text style={styles.studentName}>{data.student}</Text>
            <View style={styles.attendanceContainer}>
              <Text style={styles.attendanceLabel}>Asistencias:</Text>
              <Text style={styles.attendancePercentage}>{data.attendance}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
    width: '30%',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  statNumberContainer: {
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Righteous-Regular',
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
  tableContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 14,
    marginBottom: 6,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  studentName: {
    fontSize: 14,
    color: 'white',
    flex: 1,
    fontFamily: 'Righteous-Regular',
  },
  attendanceContainer: {
    alignItems: 'flex-end',
  },
  attendanceLabel: {
    fontSize: 10,
    color: 'white',
    opacity: 0.9,
    fontFamily: 'Righteous-Regular',
    marginBottom: -2,
  },
  attendancePercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Righteous-Regular',
  }
});