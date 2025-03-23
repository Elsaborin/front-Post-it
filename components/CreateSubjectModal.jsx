import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';

export default function CreateSubjectModal({ visible, onClose, onSubmit }) {
  const [subjectTitle, setSubjectTitle] = useState('');
  const [groupTitle, setGroupTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!subjectTitle.trim()) {
      alert('Por favor ingresa un título para la asignatura');
      return;
    }
    onSubmit({
      subject: subjectTitle,
      group: groupTitle,
      description
    });
    setSubjectTitle('');
    setGroupTitle('');
    setDescription('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Crear asignatura</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Título de la asignatura</Text>
            <TextInput
              style={styles.input}
              value={subjectTitle}
              onChangeText={setSubjectTitle}
              placeholder="Título de la asignatura"
            />
          </View>

          <Text style={styles.sectionTitle}>Grupo inicial (opcional)</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Título del grupo</Text>
            <TextInput
              style={styles.input}
              value={groupTitle}
              onChangeText={setGroupTitle}
              placeholder="Título del grupo"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Descripción"
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Crear asignatura</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#696999',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});