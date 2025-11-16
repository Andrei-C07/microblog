import { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuthStore } from "store/authStore";
import ProfileView from "./components/ProfileView";
import { Ionicons } from "@expo/vector-icons";

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const { token } = useAuthStore();
  const [user, setUser] = useState(null);
  const [publications, setPublications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const router = useRouter();

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:8000/api/utilisateur/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUser(data);

    await fetchPublications(data.id);
  };

  const fetchPublications = async (userId) => {
    if (!userId) return;

    const pubRes = await fetch(
      `http://localhost:8000/api/publication/par_user/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const pubData = await pubRes.json();
    setPublications(pubData.data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUser();
    setRefreshing(false);
  };
  useEffect(() => {
    const loadCurrentUser = async () => {
      const res = await fetch(
        "http://localhost:8000/api/utilisateur/current_user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setCurrentUserId(data.id);
    };
    loadCurrentUser();
  }, []);
  const isMyProfile = currentUserId && Number(id) === currentUserId;
  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleFollowToggle = async () => {
    if (!user) return;

    const method = user.is_following ? "DELETE" : "POST";

    await fetch(`http://localhost:8000/api/utilisateur/suivre/${user.id}`, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchUser();
  };
  if (!user) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D99A79" }}>
      <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
        <Ionicons name="arrow-back" size={26} color={"black"} />
      </TouchableOpacity>

      <ProfileView
        user={user}
        publications={publications}
        refreshing={refreshing}
        onRefresh={onRefresh}
        isCurrentUser={isMyProfile}
        onLogout={isMyProfile ? () => router.replace("/") : null}
        onFollowToggle={handleFollowToggle}
      />
    </SafeAreaView>
  );
}
