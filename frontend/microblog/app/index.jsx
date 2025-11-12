import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, View, Text, Button, StyleSheet, Image } from "react-native";

export default function LoginScreen() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleConnexion = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/jeton/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    nom_utilisateur: username,
                    mot_de_passe: password,
                }),
            });

            const data = await response.json();
            console.log(data);
            if(!response.ok){
                alert(data.error || "Erreur connexion")
                return;
            }
            router.navigate("/(tabs)/home");
        } catch (err){
            console.log("Erreur de connexion:" + err);
        }
    };

    return(
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <Image
                source={require('../assets/images/MicroBlogLogo.png')}
            />
            <Text>Connexion</Text>
            <TextInput
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            <Button title="Se connecter" onPress={handleConnexion} />
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        padding: 24
    },
    safeArea: {
        flex: 1
    }
});