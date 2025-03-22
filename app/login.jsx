import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '../context/session';
import { Mail, Lock, ChevronRight } from 'lucide-react-native';

const correo = 'usuario@ejemplo.com';
const password = 'password123';

export default function SignIn() {
  const { signIn } = useSession();
  const [useCorreo, setCorreo] = useState('');
  const [usePass, setPass] = useState('');

  const handleSignIn = () => {
    const emailLower = useCorreo.toLowerCase();
    const passLower = usePass.toLowerCase();

    if (emailLower === correo && passLower === password) {
      signIn(emailLower);
      setTimeout(() => router.replace('/'), 500);
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>post it!</Text>
      <Text style={styles.tagline}>
        Gestión y control de tus alumnos{'\n'}
        total a la palma de tu mano
      </Text>

      <View style={styles.inputContainer}>
        <Mail size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={useCorreo}
          onChangeText={setCorreo}
          placeholderTextColor="#999"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Lock size={24} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={usePass}
          onChangeText={setPass}
          placeholderTextColor="#999"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          <Text style={styles.linkText}>Términos de uso</Text>
          {'  '}
          <Text style={styles.linkText}>privacidad</Text>
          {'\n'}
          <Text style={styles.linkText}>política de</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerContainer}
        onPress={() => router.replace('/singUp')}>
        <Text style={styles.registerText}>Registrate</Text>
        <ChevronRight size={20} color="#696999" />
      </TouchableOpacity>

      <Text style={styles.copyright}>Todos los derechos reservados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    padding: 30,
  },
  logo: {
    fontSize: 42,
    marginBottom: 12,
    color: '#444',
    fontFamily: 'Righteous-Regular', // Asegúrate de tener la fuente instalada
    textAlign: 'center',
    letterSpacing: 1.5,
    includeFontPadding: false, // Elimina padding adicional
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    color: '#666',
    fontFamily: 'Righteous-Regular',
    includeFontPadding: false,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#DDD',
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 18,
    height: 56,
    backgroundColor: 'white',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#444',
    fontFamily: 'Righteous-Regular',
    paddingVertical: 14,
    includeFontPadding: false,
  },
  termsContainer: {
    marginBottom: 28,
    marginTop: 10,
  },
  termsText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Righteous-Regular',
    includeFontPadding: false,
  },
  linkText: {
    color: '#696999',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#696999',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Righteous-Regular',
    letterSpacing: 0.5,
    includeFontPadding: false,
  },
  registerContainer: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    color: '#696999',
    fontSize: 14,
    marginRight: 5,
    fontFamily: 'Righteous-Regular',
    includeFontPadding: false,
  },
  copyright: {
    position: 'absolute',
    bottom: 20,
    color: '#666',
    fontSize: 12,
    fontFamily: 'Righteous-Regular',
    includeFontPadding: false,
  },
});