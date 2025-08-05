"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signIn("google", { 
        redirect: false 
      });
      
      if (result?.ok) {
        router.push("/top");
      }
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  return (
    <button 
      onClick={handleLogin}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Googleでログイン
    </button>
  );
} 