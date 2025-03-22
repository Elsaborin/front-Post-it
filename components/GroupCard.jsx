import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Pencil, Trash2 } from 'lucide-react-native';

export default function GroupCard({ title, description, onEdit, onDelete, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>
      {(onEdit || onDelete) && (
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <Pencil size={20} color="#696999" />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
              <Trash2 size={20} color="#696999" />
            </TouchableOpacity>
          )}
        </View>
      )}
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
  description: {
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