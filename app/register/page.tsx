"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "@/firebase/firebase";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const RegisterPage = () => {
  useAuthRedirect();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      // Temporarily store user data in local storage
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          firstName,
          lastName,
          gender,
          email,
          password,
          confirmPassword,
        })
      );

      setMessage(
        "Registration successful! Please check your email for verification."
      );

      // Clear form fields
      setFirstName("");
      setLastName("");
      setGender("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        if (errorMessage.includes("email-already-in-use")) {
          setError("This email is already in use. Please use a different email.");
        } else if (errorMessage.includes("weak-password")) {
          setError("Your password is too weak. Please use a stronger password.");
        } else if (errorMessage.includes("invalid-email")) {
          setError("The email address is invalid. Please enter a valid email.");
        } else {
          setError("An error occurred during registration. Please try again.");
        }
      } else {
        setError("An unknown error occurred");
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
    <div className="bg-gradient-to-b from-gray-600 to-black flex justify-center items-center min-h-screen w-full overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="flex space-x-4">
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              className="flex-1"
              initial={{ x: -50, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </motion.div>
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              className="flex-1"
              initial={{ x: -50, opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </motion.div>
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Register
          </button>
        </form>
        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4"
          type="button"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;