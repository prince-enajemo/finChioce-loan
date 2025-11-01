"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";

import { auth, firestore } from "@/firebase/firebase";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const LoginPage = () => {
  useAuthRedirect();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        // Retrieve user document
        const registrationData = localStorage.getItem("registrationData");
        const {
          firstName = "",
          lastName = "",
          gender = "",
          email = "",
          Password = "",
        } = registrationData ? JSON.parse(registrationData) : {};

        // Check if user document exists in Firestore
        const userDoc = await getDoc(doc(firestore, "users", user.uid));

        if (!userDoc.exists()) {
          // Save user document after email verification
          await setDoc(doc(firestore, "users", user.uid), {
            firstName,
            lastName,
            gender,
            email: user.email,
            Password,
          });
        }
        router.push("/dashboard");
      } else {
        setError("Please verify your email before logging in.");
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;

        if (errorMessage.includes("user-not-found")) {
          setError("No account found with this email. Please register first.");
        } else if (errorMessage.includes("account-does-not-exist")) {
          setError(
            "The account does not exist. Please check your email or register.",
          );
        } else if (errorMessage.includes("wrong-password")) {
          setError("Incorrect password. Please try again.");
        } else if (errorMessage.includes("invalid-credentials")) {
          setError(
            "Invalid credentials. Please check your email and password.",
          );
        } else if (errorMessage.includes("too-many-requests")) {
          setError("Too many login attempts. Please try again later.");
        } else if (errorMessage.includes("invalid-auth")) {
          setError("Authentication failed. Please try logging in again.");
        } else {
          setError("invalid .");
        }
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Optionally, you can store user data or navigate to another page
      setMessage(`Welcome ${user.displayName}!`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred during Google Sign-In");
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-600 to-black flex justify-center items-center h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Login
          </button>
        </form>
        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4"
          type="button"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-500 hover:underline" href="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
