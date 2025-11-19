import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#A8E4E7",
        tabBarInactiveTintColor: "#BAFFAC",
        tabBarStyle: {
          backgroundColor: "#5A5A5A",
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          borderRadius: 20,
          marginHorizontal: 20,
          marginBottom: 20,
          position: "absolute",
          shadowColor: "#000",
          shadowOpacity: 1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 10,
        },

        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              color,
              fontSize: 20,
              fontFamily: "JotiOne_400Regular",
              textDecorationLine: focused ? "underline" : "none",
            }}
          >
            {route.name === "new_post" ? "Ajouter une publication" : 
             route.name.charAt(0).toUpperCase() + route.name.slice(1)}
          </Text>
        ),
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="new_post"
        options={{
          title: "Ajouter une publication",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
