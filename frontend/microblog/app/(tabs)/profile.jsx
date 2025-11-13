import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuthStore } from "../../store/authStore";
import ProfileView from "../components/ProfileView";
import { router } from "expo-router";

//TODO: 
/*
Show more info like following count, followers count
Make the onpress for deconnexion work (clear zustand token -> redirect to login)
Call /logout route from backend if you want flash message, optional tho
*/
export default function ProfileScreen() {
  const { token, clearToken } = useAuthStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:8000/api/utilisateur/current_user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);


  if (!user) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <ProfileView
      user={user}
      isCurrentUser
      onLogout={() => {
        clearToken();
        router.replace("/");
      }}
    />
  );
}
