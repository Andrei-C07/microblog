import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  const fetchPost = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/publication/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPost(data);
    } catch (err) {
      console.log("Error fetching post:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#5A5A5A" />
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "black" }}>Cette publication n&apos;existe pas.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.postCard}>

        <Text style={styles.postAuthor}>
          <TouchableOpacity
            onPress={() => {
              router.push(`/user/${post.user_id}`);
            }}
          >
            <Text style={styles.postAuthor}> Par : {post.auteur} </Text>
          </TouchableOpacity>

        </Text>


        <Text style={styles.postContent}>{post.content}</Text>

        <Text style={styles.postDate}>
          {new Date(post.created_at).toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/(tabs)/home")}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Retour au menu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB67D",
    padding: 16,
  },

  postCard: {
    backgroundColor: "#BAFFAC",
    borderColor: "#5A5A5A",
    borderWidth: 3,
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
  },

  postAuthor: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 8,
  },

  postContent: {
    fontSize: 17,
    marginBottom: 12,
  },

  postDate: {
    fontSize: 12,
    color: "#333",
  },

  backButton: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#5A5A5A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },

  backButtonText: {
    color: "#A8E4E7",
    fontWeight: "600",
    fontFamily: "JotiOne_400Regular",
    fontSize: 16,
  },
});

