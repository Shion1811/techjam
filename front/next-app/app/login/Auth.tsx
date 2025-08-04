// app/login/Auth.tsx
"use client";


import { auth } from "@/auth";

export default async function LoginPage() {
  const session = await auth(); // 🔥 ここで「auth is not a function」になる人が多い

  return <p>{session ? "ログイン中" : "未ログイン"}</p>;
}