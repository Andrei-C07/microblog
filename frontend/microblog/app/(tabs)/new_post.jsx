import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useAuthStore } from "store/authStore";

export default function NewPostScreen() {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const [content, setContent] = useState("");

  const handleAddPost = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/publication/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erreur lors de l'ajout");
        return;
      }

      setContent("");
      router.back();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/MicroBlogLogo.png")}
        style={styles.logo}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Nouvelle Publication</Text>

        <TextInput
          placeholder="Écris quelque chose..."
          placeholderTextColor={"#555"}
          value={content}
          multiline
          onChangeText={setContent}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddPost}>
          <Text style={styles.buttonText}>Publier</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D99A79",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#A8DDB2",
    padding: 20,
    borderRadius: 22,
    elevation: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    height: 130,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    fontSize: 16,
    textAlignVertical: "top",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#007aff",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
