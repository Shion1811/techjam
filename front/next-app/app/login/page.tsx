import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  console.log(session);

  return (
    <>
      {session !== null ? (
        <>
          <h1>{session.user?.name}がログインしたよ</h1>
          <img src={session.user?.image as string} alt="user image" />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Signout</button>
          </form>
        </>
      ) : (
        <>
          <h1>ログインしてね</h1>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button type="submit" className="bg-amber-200 border border-2">Signin with Google</button>
          </form>
        </>
      )}
    </>
  );
}