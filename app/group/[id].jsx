import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, Plus, Users, Star, FileText, Download, CreditCard as Edit } from 'lucide-react-native';
import Header from '../../components/Header';
import WeightingModal from '../../components/WeightingModal';

export default function GroupScreen() {
  const { id, title, subjectTitle } = useLocalSearchParams();
  const [isWeightingModalVisible, setWeightingModalVisible] = useState(false);
  const [weights, setWeights] = useState(null);

  const handleWeightingSave = (savedWeights) => {
    setWeights(savedWeights);
    setWeightingModalVisible(false);
  };

  const students = [
    {
      name: 'Hernández Primo Julián',
      score: 89,
      color: '#3498db'
    },
    {
      name: 'Cutz Martinez Luis Daniel',
      score: 69,
      color: '#e74c3c'
    }
  ];

  return (
    <View style={styles.container}>
      <Header title="Calificaciones" />

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

      <View style={styles.weightingsContainer}>
        {weights?.map((weight) => (
          <Text key={weight.id} style={styles.weightText}>
            {weight.name} ({weight.weight}%)
          </Text>
        ))}
      </View>

      <ScrollView style={styles.studentsContainer}>
        {students.map((student, index) => (
          <View key={index} style={[styles.studentCard, { backgroundColor: student.color }]}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreText}>{student.score}</Text>
            </View>
            <Text style={styles.studentName}>{student.name}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => router.push('/participaciones')}
        >
          <Star size={24} color="#696999" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/')}
        >
          <FileText size={24} color="#696999" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/asistencias')}
        >
          <Users size={24} color="#696999" />
        </TouchableOpacity>
      </View>

      <WeightingModal
        visible={isWeightingModalVisible}
        onClose={() => setWeightingModalVisible(false)}
        onSave={handleWeightingSave}
      />
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
  weightingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  weightText: {
    fontSize: 16,
    color: '#333',
  },
  studentsContainer: {
    flex: 1,
    padding: 20,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  studentName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    padding: 10,
    alignItems: 'center',
  },
});