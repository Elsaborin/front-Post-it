import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { X, Pencil, Trash2, Save } from 'lucide-react-native';

export default function WeightingModal({ visible, onClose, onSave, initialWeights, isSaving }) {
  const [weights, setLocalWeights] = useState(initialWeights);
  const [newItemName, setNewItemName] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    setLocalWeights(initialWeights);
  }, [initialWeights]);

  const totalWeight = weights.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0).toFixed(2);

  const handleAddItem = () => {
    if (!newItemName.trim()) {
      Alert.alert('Error', 'Ingresa un nombre para la ponderación');
      return;
    }
    
    const newWeight = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      weight: 10,
      isEditing: true
    };
    
    setLocalWeights([...weights, newWeight]);
    setNewItemName('');
  };

  const handleWeightChange = (id, value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const weightValue = Math.min(Math.max(parseFloat(numericValue) || 0, 0), 100);
    
    setLocalWeights(weights.map(w => 
      w.id === id ? { ...w, weight: weightValue } : w
    ));
  };

  const handleSave = () => {
    const names = weights.map(w => w.name.trim().toLowerCase());
    if (new Set(names).size !== names.length) {
      Alert.alert('Error', 'Nombres de ponderación duplicados');
      return;
    }
    
    onSave(weights);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Configurar Ponderaciones</Text>
            <TouchableOpacity onPress={onClose} disabled={isSaving}>
              <X size={24} color={isSaving ? '#ccc' : '#000'} />
            </TouchableOpacity>
          </View>

          {weights.map((item) => (
            <View key={item.id} style={styles.weightItem}>
              <TextInput
                style={styles.input}
                value={item.name}
                onChangeText={(text) => 
                  setLocalWeights(weights.map(w => 
                    w.id === item.id ? { ...w, name: text } : w
                  ))
                }
                placeholder="Nombre"
                editable={!isSaving}
              />
              
              <TextInput
                style={[styles.input, styles.percentageInput]}
                value={String(item.weight)}
                onChangeText={(text) => handleWeightChange(item.id, text)}
                keyboardType="numeric"
                placeholder="0%"
                editable={!isSaving}
              />
            </View>
          ))}

          <Text style={[styles.total, totalWeight != 100 && styles.totalError]}>
            Total: {totalWeight}%
          </Text>

          <View style={styles.addContainer}>
            <TextInput
              style={styles.addInput}
              value={newItemName}
              onChangeText={setNewItemName}
              placeholder="Nueva ponderación"
              editable={!isSaving}
            />
            <TouchableOpacity 
              style={[styles.addButton, isSaving && styles.disabledButton]} 
              onPress={handleAddItem}
              disabled={isSaving}
            >
              <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
              disabled={isSaving}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.saveButton,
                (totalWeight != 100 || isSaving) && styles.disabledButton
              ]} 
              onPress={handleSave}
              disabled={totalWeight != 100 || isSaving}
            >
              <Text style={styles.saveText}>
                {isSaving ? 'Guardando...' : 'Guardar'}
              </Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '90%',
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
    fontFamily: 'Righteous-Regular',
  },
  weightItem: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  percentageInput: {
    flex: 0.3,
    textAlign: 'center',
  },
  total: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    fontFamily: 'Righteous-Regular',
  },
  totalError: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  addContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 15,
  },
  addInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#696999',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Righteous-Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#696999',
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
    opacity: 0.7,
  },
  cancelText: {
    color: '#666',
    fontFamily: 'Righteous-Regular',
  },
  saveText: {
    color: 'white',
    fontFamily: 'Righteous-Regular',
  },
});