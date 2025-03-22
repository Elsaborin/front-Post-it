import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Pencil, Trash2 } from 'lucide-react-native';

export default function SubjectCard({ title, groupCount, onEdit, onDelete, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{groupCount} grupo{groupCount !== 1 ? 's' : ''}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <Pencil size={20} color="#696999" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <Trash2 size={20} color="#696999" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
});