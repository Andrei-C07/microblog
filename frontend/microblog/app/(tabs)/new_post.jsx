import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, View, Text, Button, StyleSheet, Image } from "react-native";
import { useAuthStore } from "store/authStore";

export default function NewPostScreen() {
    const token = useAuthStore((state) => state.token);
    console.log("Token utilisé:", token);

    const [content, setContent] = useState("");

    const handleAddPost = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/publication/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    content: content,
                }),
            });
            const data = await response.json();
            console.log("Publication ajoutée avec succès :", data);
            if (!response.ok) {
                alert(data.error || "Erreur lors de l'ajout de la publication");
                return;
            }
            setContent("");
        } catch (error) {
            console.error("Erreur lors de l'ajout de la publication :", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    source={require('../../assets/images/MicroBlogLogo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Ajouter Une Nouvelle Publication</Text>
                <TextInput
                    placeholder="Contenu de la publication"
                    value={content}
                    multiline
                    onChangeText={setContent}
                    style={{ height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 16, padding: 8 }}
                />
                <Button title="Ajouter la Publication" onPress={handleAddPost} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  logo: {
    aspectRatio: 1,
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 16,

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Dank-Mono",
  }
});