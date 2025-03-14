import { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, PanResponder, Animated, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '../ctx';
import { authAPI } from '../src/api/auth';

export default function SignIn() {
  const { signIn } = useSession();
  const [useCorreo, setCorreo] = useState('');
  const [usePass, setPass] = useState('');
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
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={useCorreo}
          onChangeText={setCorreo}
          editable={!loading}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>🔒</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={usePass}
          onChangeText={setPass}
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
  },
  tagline: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
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
  },
  registerContainer: {
    position: 'absolute',
    right: 20,
    bottom: 80,
  },
  registerText: {
    color: '#000',
    fontSize: 14,
  },
  copyright: {
    position: 'absolute',
    bottom: 20,
    color: '#666',
    fontSize: 12,
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
});