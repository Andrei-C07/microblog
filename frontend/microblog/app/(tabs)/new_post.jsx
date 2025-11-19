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

    if (content.trim() == null || content.trim() === ""){
        
    }
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
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={[styles.button, content.trim() === "" && styles.disabledBtn]} onPress={handleAddPost} disabled={content.trim() === ""}>
          <Text style={styles.buttonText}>Publier</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB67D",
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
    backgroundColor: "#BAFFAC",
    borderColor: "#5A5A5A",
    borderWidth: 3,
    padding: 20,
    borderRadius: 22,
    elevation: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#5A5A5A",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "JotiOne_400Regular",
  },

  input: {
    height: 130,
    backgroundColor: "#fff",
    borderColor: "#5A5A5A",
    borderWidth: 3,
    borderRadius: 16,
    padding: 14,
    fontSize: 16,
    textAlignVertical: "top",
    marginBottom: 20,
    fontFamily: "JotiOne_400Regular",
  },

  button: {
    marginTop: 20,
    width: 200,
    backgroundColor: "#5A5A5A",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    borderColor: "#000000ff",
    borderWidth: 3,
    padding: 20,
    borderRadius: 22,
  },

  buttonText: {
    color: "#A8E4E7",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "JotiOne_400Regular",
  },

  disabledBtn: {
    opacity: 0.4,
  },
});
