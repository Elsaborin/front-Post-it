import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '../../ctx'; 

export default function AppLayout() {
  const { session, isLoading, isSignUp } = useSession(); 

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session && isSignUp) {
    return <Redirect href="/signUp" />;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <Stack />;
}
