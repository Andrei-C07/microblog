import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useAuthStore } from "../store/authStore.js";

export default function LoginScreen() {
    const router = useRouter();

    const authStore = useAuthStore();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleConnexion = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/jeton/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nom_utilisateur: username,
                    mot_de_passe: password,
                }),
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                alert(data.error || "Erreur connexion")
                return;
            }
            router.navigate("/(tabs)/home");
            authStore.setToken(data.token);
        } catch (err) {
            console.log("Erreur de connexion:" + err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Connexion</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nom d’utilisateur"
                    placeholderTextColor="#6f8d72ff"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="False"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor="#6f8d72ff"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="False"
                />

                <TouchableOpacity style={styles.button} onPress={handleConnexion}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.logoContainer}>
                <Image
                    source={require("../assets/images/MicroBlogLogo.png")}
                    style={{ width: 200, height: 200, resizeMode: "contain" }}
                />

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFB67D",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 60,
    },
    title: {
        fontSize: 36,
        fontWeight: "600",
        color: "#BAFFAC",
        fontFamily: "JotiOne_400Regular",
    },
    form: {
        width: "80%",
        alignItems: "center",
        gap: 20,
    },
    input: {
        width: "100%",
        backgroundColor: "#BAFFAC",
        borderWidth: 2, 
        borderColor: "#5A5A5A",
        borderRadius: 30,
        padding: 14,
        fontSize: 16,
        fontFamily: "JotiOne_400Regular",
    },
    button: {
        backgroundColor: "#BAFFAC",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderWidth: 2, 
        borderColor: "#5A5A5A",
        borderRadius: 30,
        marginTop: 10,
    },
    buttonText: {
        color: "#5A5A5A",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "JotiOne_400Regular",
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: 20,
    }
});
