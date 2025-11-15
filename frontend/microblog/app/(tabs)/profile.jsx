import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuthStore } from "../../store/authStore";
import ProfileView from "../components/ProfileView";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { token, clearToken } = useAuthStore();
  const [user, setUser] = useState(null);
  const [publications, setPublications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:8000/api/utilisateur/current_user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setUser(data);

    await fetchPublications(data.id);
  };

  const fetchPublications = async (userId = user?.id) => {
    if (!userId) return;

    const pubRes = await fetch(
      `http://localhost:8000/api/publication/par_user/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const pubData = await pubRes.json();
    setPublications(pubData);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUser();
    await fetchPublications();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <ProfileView
      user={user}
      publications={publications}
      refreshing={refreshing}
      onRefresh={onRefresh}
      isCurrentUser
      onLogout={() => {
        clearToken();
        router.replace("/");
      }}
    />
  );
}
