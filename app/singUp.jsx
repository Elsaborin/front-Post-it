import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, ChevronLeft } from 'lucide-react-native';

export default function SignUp() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const handleSignUp = () => {
    if (!correo || !password || !confirmPassword) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!aceptaTerminos) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    alert('Registro exitoso');
    setTimeout(() => router.replace('/login'), 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>post it!</Text>
      <Text style={styles.tagline}>
        Gestión y control de tus alumnos{'\n'}
        total a la palma de tu mano
      </Text>

      <View style={styles.inputContainer}>
        <Mail size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputContainer}>
        <Lock size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputContainer}>
        <Lock size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={[styles.checkbox, aceptaTerminos && styles.checkboxChecked]}
          onPress={() => setAceptaTerminos(!aceptaTerminos)}
        >
          {aceptaTerminos && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Confirmo que he leído atentamente y acepto los{' '}
          <Text style={styles.linkText}>términos de uso</Text> y{' '}
          <Text style={styles.linkText}>políticas de privacidad</Text> de post it!
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => router.replace('/login')}>
        <ChevronLeft size={20} color="#696999" />
        <Text style={styles.loginText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.copyright}>Todos los derechos reservados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 0.5,
    fontFamily: 'Righteous',
  },
  tagline: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
    paddingRight: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#696999',
    borderRadius: 4,
    marginRight: 10,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#696999',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  linkText: {
    color: '#696999',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#696999',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  loginContainer: {
    position: 'absolute',
    left: 20,
    bottom: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: '#696999',
    fontSize: 14,
    marginLeft: 5,
  },
  copyright: {
    position: 'absolute',
    bottom: 20,
    color: '#666',
    fontSize: 12,
  },
});