import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../util/supabaseClient";

export default function Layout({ children }) {
  const [session, setSession] = useState<Session>(null);
  const router = useRouter();

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await router.push("/");
  };

  const signInOut = session ? (
    <button onClick={handleSignOut}>
      <a>Sign Out</a>
    </button>
  ) : (
    <Link href="/signin">
      <a>Sign In</a>
    </Link>
  );

  return (
    <>
      <header className="bg-white py-2 drop-shadow-sm border-b border-gray-100">
        <div className="container flex gap-5 items-center max-w-6xl">
          <Link href="/">
            <a className="font-serif font-semibold text-2xl italic">Recipes</a>
          </Link>
          <nav className="flex flex-auto items-center">
            <ul className="flex gap-4">
              {session && (
                <>
                  <li>
                    <Link href="/recipes">
                      <a>My Recipes</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings">
                      <a>Settings</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {signInOut}
        </div>
      </header>
      <main className="container py-10 max-w-3xl">{children}</main>
    </>
  );
}
