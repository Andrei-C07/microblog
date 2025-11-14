import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/authStore";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/publication/", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des publications :", error);
      }
    };

    fetchPosts();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    fetchPosts()
    setRefreshing(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/MicroBlogLogo.png")}
        style={styles.logo}
      />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>Par : {item.auteur}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
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
  postContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  postTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});