"use client";
import React from "react";

export default function ClientLogoutButton() {
  const handleLogout = () => {
    // シンプルなログアウト処理
    alert("ログアウトしました");
  };

  return (
    <button 
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      ログアウト
    </button>
  );
} 