<<<<<<< HEAD
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, ChevronLeft } from 'lucide-react-native';
=======
import { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, PanResponder, Animated, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { authAPI } from '../src/api/auth';
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf

export default function SignUp() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
<<<<<<< HEAD
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
=======
  const [nombre, setNombre] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < 0) {
          const newValue = Math.max(gestureState.dx, -100);
          slideAnim.setValue(newValue);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -50) {
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            router.push('/login');
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

  const handleSignUp = async () => {
    try {
      if (!correo || !password || !confirmPassword || !nombre) {
        setError('Por favor completa todos los campos');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      
      if (!aceptaTerminos) {
        setError('Debes aceptar los términos y condiciones');
        return;
      }

      setLoading(true);
      setError('');
      
      await authAPI.register({
        email: correo.toLowerCase(),
        password,
        nombre
      });

      // Registro exitoso, redirigir al login
      alert('Registro exitoso');
      setTimeout(() => router.push('/login'), 500);
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
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
        <Text style={styles.inputIcon}>👤</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
          editable={!loading}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>✉️</Text>
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
<<<<<<< HEAD
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputContainer}>
        <Lock size={20} color="#666" style={styles.inputIcon} />
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
          value={password}
          onChangeText={setPassword}
<<<<<<< HEAD
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputContainer}>
        <Lock size={20} color="#666" style={styles.inputIcon} />
=======
          editable={!loading}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>🔒</Text>
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
<<<<<<< HEAD
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={[styles.checkbox, aceptaTerminos && styles.checkboxChecked]}
          onPress={() => setAceptaTerminos(!aceptaTerminos)}
=======
          editable={!loading}
        />
      </View>
      
      <View style={styles.termsContainer}>
        <TouchableOpacity 
          style={[styles.checkbox, aceptaTerminos && styles.checkboxChecked]}
          onPress={() => setAceptaTerminos(!aceptaTerminos)}
          disabled={loading}
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
        >
          {aceptaTerminos && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Confirmo que he leído atentamente y acepto los{' '}
          <Text style={styles.linkText}>términos de uso</Text> y{' '}
          <Text style={styles.linkText}>políticas de privacidad</Text> de post it!
        </Text>
      </View>

<<<<<<< HEAD
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
=======
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Registrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginContainer}
        onPress={() => router.push('/login')}
        disabled={loading}>
        <Text style={styles.loginText}>Iniciar sesión</Text>
      </TouchableOpacity>
      
      <Text style={styles.copyright}>Todos los derechos c</Text>
      
      <View style={styles.swipeIndicator}>
        <Text style={styles.swipeArrow}>←</Text>
        <Text style={styles.swipeText}>Desliza hacia la izquierda para iniciar sesión</Text>
      </View>
    </Animated.View>
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
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
<<<<<<< HEAD
    fontFamily: 'Righteous',
=======
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
  },
  tagline: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
<<<<<<< HEAD
    color: '#666',
=======
    color: '#333',
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
<<<<<<< HEAD
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
=======
    paddingHorizontal: 10,
  },
  inputIcon: {
    fontSize: 16,
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
    marginRight: 10,
  },
  input: {
    flex: 1,
<<<<<<< HEAD
    fontSize: 16,
    color: '#333',
=======
    padding: 12,
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
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
<<<<<<< HEAD
    color: '#696999',
=======
    color: '#000',
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#696999',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
<<<<<<< HEAD
    height: 50,
    justifyContent: 'center',
    marginBottom: 15,
  },
=======
    marginBottom: 15,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  loginContainer: {
    position: 'absolute',
<<<<<<< HEAD
    left: 20,
    bottom: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: '#696999',
    fontSize: 14,
    marginLeft: 5,
=======
    right: 20,
    bottom: 80,
  },
  loginText: {
    color: '#000',
    fontSize: 14,
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
  },
  copyright: {
    position: 'absolute',
    bottom: 20,
    color: '#666',
    fontSize: 12,
  },
<<<<<<< HEAD
=======
  swipeIndicator: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
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