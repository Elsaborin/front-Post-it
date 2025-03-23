import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import Header from '../../../components/Header';
import WeightingModal from '../../../components/WeightingModal';
import { useSubjects } from '../../../context/SubjectsContext';

export default function ConfigurarPonderacionesScreen() {
  const { id } = useLocalSearchParams();
  const { subjects, updateGroupWeights } = useSubjects();
  const [isSaving, setIsSaving] = useState(false);

  const group = subjects
    .flatMap(subject => subject.groups)
    .find(g => g.id === id);

  const handleSaveWeights = async (weights) => {
    if (!weights?.length) {
      Alert.alert('Error', 'Debes agregar al menos una ponderación');
      return;
    }

    const total = weights.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);
    
    if (total < 99.99 || total > 100.01) {
      Alert.alert('Error', 'La suma total debe ser exactamente 100%');
      return;
    }

    try {
      setIsSaving(true);
      await updateGroupWeights(id, weights);
      router.replace(`/group/${id}`);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron guardar los cambios');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={group?.title || 'Configurar ponderaciones'}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={isSaving}
        >
          <ChevronLeft size={24} color="#696999" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      </Header>

      <WeightingModal
        visible={true}
        onClose={() => !isSaving && router.back()}
        onSave={handleSaveWeights}
        initialWeights={group?.weights || []}
        isSaving={isSaving}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    color: '#696999',
    fontSize: 16,
    marginLeft: 4,
    fontFamily: 'Righteous-Regular',
  },
});