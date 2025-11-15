import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/authStore";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("all");
  const token = useAuthStore((state) => state.token);
  const [userId, setUserId] = useState(null);

  const fetchCurrentUser = async () => {
    const res = await fetch("http://localhost:8000/api/utilisateur/current_user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUserId(data.id);
  };

  const fetchPosts = async () => {
    let url = "http://localhost:8000/api/publication/";

    if (filter === "following") url += "suivis";
    else if (filter === "mine") url = `http://localhost:8000/api/publication/par_user/${userId}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (userId !== null) fetchPosts();
  }, [filter, userId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.postAuthor}>Par : {item.auteur}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <Text style={styles.postDate}>
        {new Date(item.created_at).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/MicroBlogLogo.png")}
        style={styles.logo}
      />

      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => setFilter("all")}
        >
          <Text style={styles.filterText}>Tous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "following" && styles.activeFilter]}
          onPress={() => setFilter("following")}
        >
          <Text style={styles.filterText}>Suivis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "mine" && styles.activeFilter]}
          onPress={() => setFilter("mine")}
        >
          <Text style={styles.filterText}>Mes Posts</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D99A79",
    paddingHorizontal: 16,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 12,
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#A8DDB2",
    padding: 12,
    borderRadius: 24,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: "#D99A79",
  },
  filterText: {
    fontWeight: "600",
    color: "#000",
  },
  postCard: {
    backgroundColor: "#A8DDB2",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
  },
  postAuthor: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  postDate: {
    fontSize: 12,
    color: "#333",
  },
});
