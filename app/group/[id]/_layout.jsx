import { Tabs } from "expo-router";
import { FileText, Star, Users } from "lucide-react-native";
import { Platform, StyleSheet } from "react-native";

export default function GroupTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#696999",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen 
        name="participaciones" 
        options={{
          title: "Participaciones",
          tabBarIcon: ({ color }) => <Star color={color} size={24} />
        }}
      />
      <Tabs.Screen 
        name="calificaciones" 
        options={{
          title: "Calificaciones",
          tabBarIcon: ({ color }) => <FileText color={color} size={24} />
        }}
      />
      <Tabs.Screen 
        name="asistencias" 
        options={{
          title: "Asistencias",
          tabBarIcon: ({ color }) => <Users color={color} size={24} />
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "ios" ? 85 : 70,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    paddingBottom: Platform.OS === "ios" ? 25 : 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: Platform.OS === "ios" ? 4 : 0,
  }
});