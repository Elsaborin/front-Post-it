import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

function useAsyncState(initialValue = [true, null]) {
  return useReducer(
    (state, action = null) => [false, action],
    initialValue
  );
}

export async function setStorageItemAsync(key, value) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    }
  }
}

export function useStorageState(key) {
  const [state, setState] = useAsyncState();

  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          const value = localStorage.getItem(key);
          setState(value ? JSON.parse(value) : null);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then(value => {
        setState(value ? JSON.parse(value) : null);
      });
    }
  }, [key]);

  const setValue = useCallback(
    (value) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}