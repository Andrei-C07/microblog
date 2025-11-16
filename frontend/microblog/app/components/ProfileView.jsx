import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileView({
    user,
    isCurrentUser,
    onLogout,
    onFollowToggle,
    publications,
    refreshing,
    onRefresh,
}) {
    if (!user) return null;

    const renderItem = ({ item }) => (
        <View style={styles.postCard}>
            <Text style={styles.postContent}>{item.content}</Text>
            <Text style={styles.postDate}>
                {new Date(item.created_at).toLocaleDateString()}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: "https://picsum.photos/200" }}
                        style={styles.avatar}
                    />

                    <Text style={styles.username}>{user.nom_utilisateur}</Text>

                    <Text style={styles.memberSince}>
                        Membre depuis {new Date(user.created_at).toLocaleDateString()}
                    </Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>{user.followers_count}</Text>
                            <Text style={styles.statLabel}>Followers</Text>
                        </View>

                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>{user.following_count}</Text>
                            <Text style={styles.statLabel}>Following</Text>
                        </View>
                    </View>

                    {isCurrentUser ? (
                        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
                            <Text style={styles.logoutText}>Déconnexion</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.followBtn} onPress={onFollowToggle}>
                            <Text style={styles.followText}>
                                {user.is_following ? "Se désabonner" : "Suivre"}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                <FlatList
                    data={publications}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    style={{ width: "100%" }}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListHeaderComponent={<Text style={styles.sectionTitle}>Publications</Text>}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#D99A79",
    },
    container: {
        flex: 1,
        backgroundColor: "#D99A79",
        paddingHorizontal: 20,
        paddingTop: 30,
    },

    header: {
        alignItems: "center",
        backgroundColor: "#A8DDB2",
        padding: 25,
        borderRadius: 22,
        marginBottom: 25,
        elevation: 4,
    },

    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 12,
        borderWidth: 3,
        borderColor: "#fff",
    },

    username: {
        fontSize: 28,
        fontWeight: "700",
        color: "#000",
    },

    memberSince: {
        fontSize: 14,
        color: "#444",
        marginTop: 4,
    },

    statsContainer: {
        flexDirection: "row",
        marginTop: 18,
        width: "70%",
        justifyContent: "space-between",
    },

    statBox: {
        alignItems: "center",
    },

    statNumber: {
        fontSize: 20,
        fontWeight: "700",
        color: "#000",
    },

    statLabel: {
        fontSize: 14,
        color: "#333",
    },

    logoutBtn: {
        marginTop: 20,
        backgroundColor: "#ff3b30",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 20,
    },

    logoutText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },

    followBtn: {
        marginTop: 20,
        backgroundColor: "#007aff",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 20,
    },

    followText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "black",
        marginBottom: 10,
        paddingLeft: 4,
    },

    postCard: {
        backgroundColor: "#A8DDB2",
        padding: 16,
        borderRadius: 16,
        marginBottom: 15,
    },

    postContent: {
        fontSize: 16,
        color: "#000",
        marginBottom: 6,
    },

    postDate: {
        fontSize: 12,
        color: "#333",
        marginTop: 4,
    },
});
