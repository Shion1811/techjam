"use client";
import React from "react";

export default function ClientLoginButton() {
  const handleLogin = () => {
    // シンプルなログイン処理
    alert("ログイン機能は現在開発中です");
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