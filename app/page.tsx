"use client";

import type { User } from "firebase/auth";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, firestore } from "@/firebase/firebase";

// import { Link } from "@heroui/link";
// import { Snippet } from "@heroui/snippet";
// import { Code } from "@heroui/code";
// import { button as buttonStyles } from "@heroui/theme";

// import { siteConfig } from "@/config/site";
// import { title, subtitle } from "@/components/primitives";
// import { GithubIcon } from "@/components/icons";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (user) {
        if (user.emailVerified) {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));

          if (!userDoc.exists()) {
            //  await setDoc(doc(firestore, "users", user.uid), {
            //retrieve additional user info here
            const registrationData = localStorage.getItem("registrationData");
            const {
              firstName = "",
              lastName = "",
              gender = "",
              email = "",
              Password = "",
            } = registrationData ? JSON.parse(registrationData) : {};

            setDoc(doc(firestore, "users", user.uid), {
              firstName,
              lastName,
              gender,
              email: user.email,
            });

            //clean up local storage
            localStorage.removeItem("registrationData");
          }
          setUser(user);
          router.push("/dashboard");
        } else {
          setUser(null);
          router.push("/welcome-page");
        }
      } else {
        setUser(null);
        router.push("/welcome-page");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );

    return (
      <div className="flex items-center justify-center min-h-screen">
        {user ? "redirecting to dashboard..." : "redirecting to login..."}
      </div>
    );
  }

  //   return (
  //     <main>
  //       <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden min-h-screen flex items-center justify-center px-6">
  //         {/* Animated Background Elements */}
  //         <motion.div
  //           animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
  //           className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl top-10 left-10"
  //           transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
  //         />
  //         <motion.div
  //           animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
  //           className="absolute w-96 h-96 bg-blue-300/10 rounded-full blur-3xl bottom-10 right-10"
  //           transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
  //         />

  //         {/* Content */}
  //         <div className="relative z-10 max-w-3xl text-center">
  //           <motion.h1
  //             animate={{ opacity: 1, y: 0 }}
  //             className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
  //             initial={{ opacity: 0, y: 40 }}
  //             transition={{ duration: 0.8 }}
  //           >
  //             Empowering Your Dreams with{" "}
  //             <span className="text-yellow-400">Fast & Secure Loans</span>
  //           </motion.h1>

  //           <motion.p
  //             animate={{ opacity: 1, y: 0 }}
  //             className="text-lg md:text-xl text-blue-100 mb-8"
  //             initial={{ opacity: 0, y: 20 }}
  //             transition={{ duration: 0.8, delay: 0.2 }}
  //           >
  //             Whether it’s for your business, education, or personal goals — we
  //             make financing simple, transparent, and accessible for all South
  //             Africans.
  //           </motion.p>

  //           {/* CTA Buttons */}
  //           <motion.div
  //             animate={{ opacity: 1, y: 0 }}
  //             className="flex justify-center gap-4"
  //             initial={{ opacity: 0, y: 20 }}
  //             transition={{ duration: 0.8, delay: 0.4 }}
  //           >
  //             <button className="flex items-center gap-2 bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition">
  //               <FaMoneyBillWave /> Apply Now
  //             </button>
  //             <button className="flex items-center gap-2 border border-white/50 px-6 py-3 rounded-lg hover:bg-white/10 transition">
  //               <FaLock /> Learn More
  //             </button>
  //           </motion.div>

  //           {/* Small Note */}
  //           <motion.p
  //             animate={{ opacity: 1 }}
  //             className="mt-8 text-sm text-blue-100/80"
  //             initial={{ opacity: 0 }}
  //             transition={{ delay: 1 }}
  //           >
  //             Trusted by over{" "}
  //             <span className="text-yellow-400 font-semibold">50,000</span> South
  //             Africans nationwide.
  //           </motion.p>
  //         </div>
  //       </section>
  //     </main>
  //  );
}
