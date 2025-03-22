<<<<<<< HEAD
import { Tabs } from 'expo-router';
import { Star, Users, FileText } from 'lucide-react-native';
import { Platform } from 'react-native';
import { useSession } from '../../context/session';

export default function TabsLayout() {
  const { session } = useSession();
  const hasWeights = session?.weights; // Check if weights are configured

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#696999',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          backgroundColor: 'white',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        ...Platform.select({
          ios: {
            tabBarStyle: {
              borderTopWidth: 0,
              elevation: 0,
              height: 80,
              backgroundColor: 'white',
            },
          },
          android: {
            tabBarStyle: {
              borderTopWidth: 0,
              elevation: 0,
              height: 60,
              backgroundColor: 'white',
            },
          },
          web: {
            tabBarStyle: {
              borderTopWidth: 0,
              height: 60,
              backgroundColor: 'white',
            },
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Asignaturas',
          tabBarIcon: ({ size, color }) => <FileText size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="participaciones"
        options={{
          title: 'Participaciones',
          tabBarIcon: ({ size, color }) => <Star size={size} color={color} />,
          tabBarButton: hasWeights ? undefined : () => null, // Hide if weights not configured
        }}
      />
      <Tabs.Screen
        name="asistencias"
        options={{
          title: 'Asistencias',
          tabBarIcon: ({ size, color }) => <Users size={size} color={color} />,
          tabBarButton: hasWeights ? undefined : () => null, // Hide if weights not configured
        }}
      />
    </Tabs>
  );
}
=======
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
>>>>>>> d27f8450c21960b93bcac5f322f26ad63666e1cf
