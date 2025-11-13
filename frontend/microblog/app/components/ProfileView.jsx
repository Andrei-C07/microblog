import { View, Text, Image, TouchableOpacity } from "react-native";

export default function ProfileView({ user, isCurrentUser, onLogout, onFollowToggle }) {
    if (!user) return null;

    return (
        <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <Image source={{ uri: "https://placekitten.com/200/200" }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 15 }} />
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>{user.nom_utilisateur}</Text>
            <Text style={{ color: "#666", marginBottom: 20 }}>
                Membre depuis {new Date(user.created_at).toLocaleDateString()}
            </Text>
            {isCurrentUser ? (
                <TouchableOpacity
                    onPress={onLogout}
                    style={{
                        backgroundColor: "#ff3b30",
                        paddingVertical: 10,
                        paddingHorizontal: 25,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Déconnexion</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={onFollowToggle}
                    style={{
                        backgroundColor: user.isFollowing ? "#ccc" : "#007aff",
                        paddingVertical: 10,
                        paddingHorizontal: 25,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        {user.isFollowing ? "Se désabonner" : "Suivre"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>

    )
}