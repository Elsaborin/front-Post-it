import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Plus, ChevronLeft } from 'lucide-react-native';
import Header from '../../components/Header';
import GroupCard from '../../components/GroupCard';
import CreateGroupModal from '../../components/CreateGroupModal';
import { useSubjects } from '../../context/SubjectsContext';

export default function SubjectScreen() {
  const { id, title } = useLocalSearchParams();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const { subjects, addGroupToSubject } = useSubjects();

  const groups = subjects.find(subject => subject.id === id)?.groups || [];

  const handleCreateGroup = (data) => {
    const newGroup = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
    };
    addGroupToSubject(id, newGroup);
    setCreateModalVisible(false);
  };

  const handleGroupPress = (group) => {
    if (!group.weights?.length) {
      router.push(`/group/${group.id}/configurar-ponderaciones`);
    } else {
      router.push({
        pathname: '/group/[id]',
        params: { 
          id: group.id,
          title: group.title,
          subjectId: id,
          subjectTitle: title
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title={title}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#696999" />
          <Text style={styles.backText}>Asignaturas</Text>
        </TouchableOpacity>
      </Header>

      <Text style={styles.subtitle}>Tus grupos</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {groups.map(group => (
          <GroupCard
            key={group.id}
            title={group.title}
            description={group.description}
            onPress={() => handleGroupPress(group)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setCreateModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Añadir grupo</Text>
        <Plus size={20} color="white" />
      </TouchableOpacity>

      <CreateGroupModal
        visible={isCreateModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onSubmit={handleCreateGroup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 16,
    fontFamily: 'Righteous-Regular',
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
    fontFamily: 'Righteous-Regular',
  },
});