<<<<<<< HEAD
import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import Header from '../../components/Header';
import CreateSubjectModal from '../../components/CreateSubjectModal';
import SubjectCard from '../../components/SubjectCard';

export default function AsignaturasScreen() {
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const handleCreateSubject = (data) => {
    const newSubject = {
      id: Date.now().toString(),
      title: data.subject,
      groups: [{
        id: Date.now().toString() + '-initial',
        title: data.group,
        description: data.description
      }]
    };
    setSubjects([...subjects, newSubject]);
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
        title: subject.title,
        initialGroups: JSON.stringify(subject.groups)
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
=======
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSession } from "../../ctx";

export default function Index() {
  const { session, signOut } = useSession();  

  return (
    <View style={styles.container}>
      {session && (
        <TouchableOpacity
          onPress={signOut}
          style={styles.signOutButton}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>
        {session ? `Bienvenido, ${session.correo}` : "Auth App"}
      </Text>
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
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
=======
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signOutButton: {
    position: 'absolute',
    top: 10,
    right: 0,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
