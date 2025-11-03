"use client";

import type { User } from "firebase/auth";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, firestore } from "@/firebase/firebase";
import LoadingSpinner from "@/components/LoadingSpinner";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();

          setUserName("${userData.firstName} ${userData.lastName}");
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    //cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handlechangePassword = () => {
    router.push("/passwordChange");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome, {userName}!</h1>
        <p className="mb-6">
          You have successfully logged in to your dashboard.
        </p>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
          onClick={handlechangePassword}
        >
          Change Password
        </button>
        <button
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
