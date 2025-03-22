import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { X, Pencil, Trash2, Save } from 'lucide-react-native';
import { useSession } from '../context/session';

export default function WeightingModal({ visible, onClose, onSave }) {
  const { setWeights } = useSession();
  const [weights, setLocalWeights] = useState([
    { id: '1', name: 'Hacer', weight: 40, isEditing: false },
    { id: '2', name: 'Saber', weight: 40, isEditing: false },
    { id: '3', name: 'Ser', weight: 20, isEditing: false },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const totalWeight = weights.reduce((sum, item) => sum + (parseInt(item.weight) || 0), 0);

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para la ponderación');
      return;
    }
    
    const newWeight = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      weight: 0,
      isEditing: false
    };
    
    setLocalWeights([...weights, newWeight]);
    setNewItemName('');
  };

  const handleEditStart = (id) => {
    setLocalWeights(weights.map(w => ({
      ...w,
      isEditing: w.id === id
    })));
    setEditingItem(weights.find(w => w.id === id));
  };

  const handleEditSave = (id) => {
    const updatedWeights = weights.map(w => ({
      ...w,
      isEditing: false
    }));
    setLocalWeights(updatedWeights);
    setEditingItem(null);
  };

  const handleWeightChange = (id, newWeight) => {
    const weightValue = parseInt(newWeight) || 0;
    if (weightValue < 0 || weightValue > 100) {
      Alert.alert('Error', 'El peso debe estar entre 0 y 100');
      return;
    }
    
    setLocalWeights(weights.map(w => 
      w.id === id ? { ...w, weight: weightValue } : w
    ));
  };

  const handleNameChange = (id, newName) => {
    if (!newName.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }
    
    setLocalWeights(weights.map(w => 
      w.id === id ? { ...w, name: newName.trim() } : w
    ));
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta ponderación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setLocalWeights(weights.filter(w => w.id !== id));
          }
        }
      ]
    );
  };

  const handleSave = () => {
    if (totalWeight !== 100) {
      Alert.alert('Error', 'La suma total de las ponderaciones debe ser 100%');
      return;
    }

    setWeights(weights); // Save weights to session context
    onSave(weights);
    onClose();
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
            <Text style={styles.modalTitle}>Configurar ponderaciones</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {weights.map((item) => (
            <View key={item.id} style={styles.weightItem}>
              {item.isEditing ? (
                <>
                  <TextInput
                    style={styles.editInput}
                    value={item.name}
                    onChangeText={(text) => handleNameChange(item.id, text)}
                  />
                  <TextInput
                    style={styles.editInput}
                    value={item.weight.toString()}
                    keyboardType="numeric"
                    onChangeText={(text) => handleWeightChange(item.id, text)}
                  />
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleEditSave(item.id)}
                  >
                    <Save size={16} color="#696999" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.weightName}>{item.name}</Text>
                  <View style={styles.weightActions}>
                    <Text style={styles.weightValue}>{item.weight}%</Text>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleEditStart(item.id)}
                    >
                      <Pencil size={16} color="#696999" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} color="#696999" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))}

          <Text style={[
            styles.totalWeight,
            totalWeight !== 100 && styles.totalWeightError
          ]}>
            Porcentaje total: {totalWeight}%
          </Text>

          <View style={styles.addItemContainer}>
            <TextInput
              style={styles.addItemInput}
              value={newItemName}
              onChangeText={setNewItemName}
              placeholder="Nombre de la ponderación"
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddItem}
            >
              <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button, 
                styles.saveButton,
                totalWeight !== 100 && styles.saveButtonDisabled
              ]}
              onPress={handleSave}
              disabled={totalWeight !== 100}
            >
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  weightItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  weightName: {
    fontSize: 16,
    flex: 1,
  },
  weightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weightValue: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  actionButton: {
    padding: 4,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    padding: 4,
    marginRight: 8,
    fontSize: 16,
    flex: 1,
  },
  totalWeight: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  totalWeightError: {
    color: '#e74c3c',
  },
  addItemContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    marginBottom: 24,
  },
  addItemInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#696999',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#E5E5E5',
  },
  saveButton: {
    backgroundColor: '#696999',
  },
  saveButtonDisabled: {
    backgroundColor: '#A5A5A5',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});