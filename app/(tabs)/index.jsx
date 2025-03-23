import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import Header from '../../components/Header';
import CreateSubjectModal from '../../components/CreateSubjectModal';
import SubjectCard from '../../components/SubjectCard';
import { useSubjects } from '../../context/SubjectsContext';

export default function AsignaturasScreen() {
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const { subjects, addSubject, addGroupToSubject } = useSubjects();

  const handleCreateSubject = (data) => {
    const newSubject = {
      id: Date.now().toString(),
      title: data.subject,
      groups: []
    };
    addSubject(newSubject);

    if (data.group.trim() !== '') {
      const initialGroup = {
        id: Date.now().toString(),
        title: data.group,
        description: data.description || ''
      };
      addGroupToSubject(newSubject.id, initialGroup);
    }

    setCreateModalVisible(false);
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const handleSubjectPress = (subject) => {
    router.push({
      pathname: '/subject/[id]',
      params: { 
        id: subject.id, 
        title: subject.title
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Tus asignaturas" />

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {subjects.map(subject => (
          <SubjectCard
            key={subject.id}
            title={subject.title}
            groupCount={subject.groups.length}
            onEdit={() => {}}
            onDelete={() => handleDeleteSubject(subject.id)}
            onPress={() => handleSubjectPress(subject)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setCreateModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Añadir asignatura</Text>
        <Plus size={20} color="white" />
      </TouchableOpacity>

      <CreateSubjectModal
        visible={isCreateModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onSubmit={handleCreateSubject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  addButton: {
    backgroundColor: '#696999',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});