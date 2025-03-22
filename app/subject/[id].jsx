import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Plus, ChevronLeft } from 'lucide-react-native';
import Header from '../../components/Header';
import GroupCard from '../../components/GroupCard';
import CreateGroupModal from '../../components/CreateGroupModal';

export default function SubjectScreen() {
  const { id, title, initialGroups } = useLocalSearchParams();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (initialGroups) {
      try {
        const parsedGroups = JSON.parse(initialGroups);
        setGroups(parsedGroups);
      } catch (error) {
        console.error('Error parsing initial groups:', error);
      }
    }
  }, [initialGroups]);

  const handleCreateGroup = (data) => {
    const newGroup = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
    };
    setGroups([...groups, newGroup]);
    setCreateModalVisible(false);
  };

  const handleGroupPress = (group) => {
    router.push({
      pathname: '/group/[id]',
      params: { 
        id: group.id, 
        title: group.title,
        subjectId: id,
        subjectTitle: title
      }
    });
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

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
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
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 16,
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