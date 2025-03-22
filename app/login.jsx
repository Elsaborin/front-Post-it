<<<<<<< HEAD
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '../context/session';
import { Mail, Lock, ChevronRight } from 'lucide-react-native';

const correo = 'usuario@ejemplo.com';
const password = 'password123';
=======
import { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, PanResponder, Animated, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '../ctx';
import { authAPI } from '../src/api/auth';
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf

export default function SignIn() {
  const { signIn } = useSession();
  const [useCorreo, setCorreo] = useState('');
  const [usePass, setPass] = useState('');
<<<<<<< HEAD

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
=======
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0) {
          const newValue = Math.min(gestureState.dx, 100);
          slideAnim.setValue(newValue);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          Animated.timing(slideAnim, {
            toValue: 100,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            router.push('/singUp');
            slideAnim.setValue(0);
          });
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await authAPI.login({
        email: useCorreo.toLowerCase(),
        password: usePass
      });

      signIn(response); 
      setTimeout(() => router.replace('/'), 500);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Animated.View 
      style={[
        styles.container,
        { transform: [{ translateX: slideAnim }] }
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.logo}>post it!</Text>
      <Text style={styles.tagline}>Gestión y control de tus alumnos{'\n'}todo a la palma de tu mano</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>✉️</Text>
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={useCorreo}
          onChangeText={setCorreo}
<<<<<<< HEAD
          placeholderTextColor="#999"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Lock size={24} color="#666" style={styles.inputIcon} />
=======
          editable={!loading}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>🔒</Text>
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={usePass}
          onChangeText={setPass}
<<<<<<< HEAD
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
=======
          editable={!loading}
        />
      </View>
      
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>Términos de uso</Text>
        <Text style={styles.termsText}> • </Text>
        <Text style={styles.termsText}>política de privacidad</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignIn}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.registerContainer}
        onPress={() => router.push('/singUp')}
        disabled={loading}>
        <Text style={styles.registerText}>Registrate</Text>
      </TouchableOpacity>
      
      <Text style={styles.copyright}>Todos los derechos c</Text>
      
      <View style={styles.swipeIndicator}>
        <Text style={styles.swipeText}>Desliza hacia la derecha para registrarte</Text>
        <Text style={styles.swipeArrow}>→</Text>
      </View>
    </Animated.View>
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
<<<<<<< HEAD
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
=======
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
<<<<<<< HEAD
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
=======
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 12,
  },
  termsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  termsText: {
    fontSize: 12,
    color: '#000',
  },
  button: {
    backgroundColor: '#696999',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
  },
  registerContainer: {
    position: 'absolute',
    right: 20,
    bottom: 80,
<<<<<<< HEAD
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    color: '#696999',
    fontSize: 14,
    marginRight: 5,
    fontFamily: 'Righteous-Regular',
    includeFontPadding: false,
=======
  },
  registerText: {
    color: '#000',
    fontSize: 14,
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
  },
  copyright: {
    position: 'absolute',
    bottom: 20,
    color: '#666',
    fontSize: 12,
<<<<<<< HEAD
    fontFamily: 'Righteous-Regular',
    includeFontPadding: false,
  },
=======
  },
  swipeIndicator: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeText: {
    fontSize: 12,
    color: '#999',
    marginRight: 5,
  },
  swipeArrow: {
    fontSize: 16,
    color: '#696999',
  },
  errorText: {
    color: '#ff3b30',
    marginBottom: 15,
    textAlign: 'center',
  }
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
});