// app/login/Auth.tsx
"use client";


import { auth } from "@/auth";

export default async function LoginPage() {
  const session = await auth(); a

  return <p>{session ? "ログイン中" : "未ログイン"}</p>;
}