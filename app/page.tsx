import Image from "next/image";
import { auth, signIn, signOut } from "./lib/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Hello Pleb Post</h1>
        <h1>{session?.user?.name}</h1>

        <form
          action={async () => {
            "use server"
            await signIn("github")
          }}
        >
          <button type="submit">Signin with GitHub</button>
        </form>

        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button type="submit">Signout</button>
        </form>
      </main>
    </div>
  );
}
