import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../auth";

export default async function TopPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">トップページ</h1>
        <div className="text-center">
          <p className="mb-4">ログインに成功しました！</p>
          <p className="text-gray-600">ユーザー: {session.user?.name}</p>  {/* ユーザー名をアプリのユーザー名に変えたい */}
          {session.user?.image && (
            <img 
              src={session.user.image} 
              alt="ユーザー画像" 
              className="w-16 h-16 rounded-full mx-auto mt-4"
            />
          )}
        </div>
      </div>
    </div>
  );
}
