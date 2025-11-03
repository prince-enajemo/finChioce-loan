"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

import { auth } from "@/firebase/firebase";
import LoadingSpinner from "@/components/LoadingSpinner";

const PasswordChangePage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePasswordChange = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const user = auth.currentUser;

      if (user && user.email) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword,
        );

        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setMessage("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setError("No user is currently signed in.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Change Password
        </h2>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-green-500">{message}</p>}
        <form className="space-y-4" onSubmit={handlePasswordChange}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <input
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="confirmNewPassword"
            >
              Confirm New Password
            </label>
            <input
              required
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            type="submit"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangePage;
