import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, View, Text, Button, StyleSheet, Image } from "react-native";

export default function LoginScreen() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleConnexion = () => {
        if (username && password) {
            router.navigate("/home");
        }
    }
    return(
        <SafeAreaView>
        <View>
            <Text> Connexion</Text>
            <TextInput
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Image
                source={require('../assets/images/favicon.png')}
            />
            <Button title="Se connecter" onPress={handleConnexion} />
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});