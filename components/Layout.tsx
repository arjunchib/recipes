import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../util/supabaseClient";

export default function Layout({ children }) {
  const [session, setSession] = useState<Session>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <header className="bg-white py-2 drop-shadow-sm border-b border-gray-100">
        <div className="container flex gap-5 items-center">
          <Link href="">
            <a className="font-serif font-semibold text-2xl italic">Recipes</a>
          </Link>
          <nav className="flex flex-auto items-center">
            <ul>
              {session && (
                <li>
                  <Link href="/recipes">My Recipes</Link>
                </li>
              )}
            </ul>
          </nav>
          <Link href="/signin">Sign In</Link>
        </div>
      </header>
      <main className="container py-10 max-w-3xl">{children}</main>
    </>
  );
}
