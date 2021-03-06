import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { supabase } from "../util/supabaseClient";

export default function SignIn() {
  const email = useRef(null);
  const password = useRef(null);
  const router = useRouter();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signIn({
      email: email.current.value,
      password: password.current.value,
    });
    if (error) console.error(error);
    await router.push("/recipes");
  };

  return (
    <>
      <header className="pb-6">
        <h1 className="text-2xl">Sign In</h1>
        <p>
          No account yet?{" "}
          <Link href="/signup">
            <a className="link">Sign up</a>
          </Link>
        </p>
      </header>
      <div className="pb-6">
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          className="shadow rounded-lg block w-full"
          placeholder="gordon@myrecipes.com"
          type="email"
          id="email"
          ref={email}
        />
      </div>
      <div className="pb-6">
        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          className="shadow rounded-lg block w-full"
          placeholder="secret123"
          type="password"
          id="password"
          ref={password}
        />
      </div>
      <button className="btn btn-primary float-right" onClick={handleSignIn}>
        Sign In
      </button>
    </>
  );
}
