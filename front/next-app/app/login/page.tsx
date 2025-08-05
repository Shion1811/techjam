"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 自動リダイレクトを無効化
  // useEffect(() => {
  //   if (session) {
  //     router.push("/top");
  //   }
  // }, [session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p>読み込み中...</p>
        </div>
      </div>
    );
  }

  const handleGoogleLogin = () => {
    signIn("google", { 
      callbackUrl: "/top",
      prompt: "select_account", // Googleアカウント選択画面を強制表示
      redirect: true // 明示的にリダイレクトを有効化
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">ログイン</h1>
          <div className="text-center">
            <p className="mb-4">Googleでログインしてください</p>
            <button 
              onClick={handleGoogleLogin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Googleでログイン
            </button>
          </div>
        </div>
      </div>
    </>
  );
}