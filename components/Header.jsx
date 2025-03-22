import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LogOut, User } from 'lucide-react-native';
import { useSession } from '../context/session';
import { useNavigation } from '@react-navigation/native'; // Añade esta importación

export default function Header({ title, subtitle }) {
  const { signOut, session } = useSession();
  const navigation = useNavigation(); // Obtén el objeto de navegación

  const handleLogout = () => {
    signOut(); // Ejecuta la acción de logout
    navigation.navigate('login'); // Redirige a la pantalla de login
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.logo}>post it!</Text>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      
      <TouchableOpacity 
        style={styles.profileButton} 
        onPress={handleLogout} // Usa la nueva función handler
      >
        <View style={styles.profileInfo}>
          <Text style={styles.email}>{session?.correo}</Text>
          <LogOut size={16} color="#666" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

// Los estilos permanecen igual

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    fontSize: 24,
    fontFamily: 'Righteous',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  profileButton: {
    alignItems: 'flex-end',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  email: {
    fontSize: 12,
    color: '#666',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});