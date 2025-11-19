import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("all");
  const token = useAuthStore((state) => state.token);
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isWeb = Platform.OS === "web";
  const router = useRouter();

  const fetchCurrentUser = async () => {
    const res = await fetch("http://localhost:8000/api/utilisateur/current_user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUserId(data.id);
  };

  const fetchPosts = async () => {
    let url = `http://localhost:8000/api/publication/?page=${page}&limit=5`;

    if (filter === "following") {
      url = `http://localhost:8000/api/publication/suivis?page=${page}&limit=5`;
    } else if (filter === "mine" && userId) {
      url = `http://localhost:8000/api/publication/par_user/${userId}?page=${page}&limit=5`;
    }

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = await response.json();
    setPosts(json.data);
    setTotalPages(json.total_pages);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (userId !== null) fetchPosts();
  }, [page, filter, userId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {router.push(`/post/${item.id}`)}}>
      <View style={styles.postCard}>
        <Text style={styles.postAuthor}>
          <TouchableOpacity
            onPress={() => {
              router.push(`/user/${item.user_id}`);
            }}
          >
            <Text style={styles.postAuthor}> Par : {item.auteur} </Text>
          </TouchableOpacity>

        </Text>
        <Text style={styles.postContent}>{item.content}</Text>
        <Text style={styles.postDate}>
          {new Date(item.created_at).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>

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
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.activeFilterText
            ]}
          >
            Tous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "following" && styles.activeFilter]}
          onPress={() => setFilter("following")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "following" && styles.activeFilterText
            ]}
          >
            Suivis
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "mine" && styles.activeFilter]}
          onPress={() => setFilter("mine")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "mine" && styles.activeFilterText
            ]}
          >
            Mes Posts
          </Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={posts.slice(0, 3)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={page === 1}
          style={[styles.pageBtn, page === 1 && styles.disabledBtn]}
          onPress={() => setPage(page - 1)}
        >
          <Text style={styles.pageText}>Précédent</Text>
        </TouchableOpacity>

        <Text style={styles.pageNumber}>
          Page {page} / {totalPages}
        </Text>

        <TouchableOpacity
          disabled={page === totalPages}
          style={[styles.pageBtn, page === totalPages && styles.disabledBtn]}
          onPress={() => setPage(page + 1)}
        >
          <Text style={styles.pageText}>Suivant</Text>
        </TouchableOpacity>
      </View>
      {isWeb && (
        <View style={styles.refreshWrapper}>
          <button
            style={styles.refreshButton}
            onClick={handleRefresh}
          >
            Rafraîchir la page
          </button>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB67D",
    paddingHorizontal: 16,
    paddingBottom: 80,
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
    backgroundColor: "#5A5A5A",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 10,
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
    backgroundColor: "#FFB67D",
  },
  activeFilterText: {
    color: "black",
  },
  filterText: {
    fontWeight: "600",
    color: "#A8E4E7",
    fontFamily: "JotiOne_400Regular",
  },
  postCard: {
    backgroundColor: "#BAFFAC",
    borderColor: "#5A5A5A",
    borderWidth: 3,
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
  },
  postAuthor: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4,
  },
  refreshWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  refreshButton: {
    padding: 10,
    width: 150,
    backgroundColor: "#A8E4E7",
    borderColor: "#5A5A5A",
    borderRadius: 30,
    fontFamily: "JotiOne_400Regular",
  },
  postContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  postDate: {
    fontSize: 12,
    color: "#333",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  pageBtn: {
    backgroundColor: "#5A5A5A",
    padding: 10,
    borderRadius: 8,
  },
  disabledBtn: {
    opacity: 0.4,
  },
  pageText: {
    color: "#A8E4E7",
    fontWeight: "600",
    fontFamily: "JotiOne_400Regular",
  },
  pageNumber: {
    color: "#000",
    fontWeight: "700",
    fontFamily: "JotiOne_400Regular",
  },
});
