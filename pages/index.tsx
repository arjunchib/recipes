import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../util/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export default function Home() {
  const [session, setSession] = useState<Session>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <main>
      <h1>Welcome to Recipes</h1>
      <nav>
        <Link href="/signin">
          <a>Sign In</a>
        </Link>
      </nav>
      {session ? <p>Welcome {session.user.email}</p> : <p>Not logged in</p>}
    </main>
  );
}
