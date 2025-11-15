import { Stack } from "expo-router";
import { useFonts, JotiOne_400Regular } from "@expo-google-fonts/joti-one";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    JotiOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}