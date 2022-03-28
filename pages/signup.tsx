import { useRouter } from "next/router";
import { useRef } from "react";
import { supabase } from "../util/supabaseClient";

export default function SignUp() {
  const email = useRef(null);
  const password = useRef(null);
  const router = useRouter();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email: email.current.value,
      password: password.current.value,
    });
    if (error) console.error(error);
    await router.push("/recipes");
  };

  return (
    <>
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
      <button
        className="bg-black text-white hover:bg-gray-700 px-6 py-2 rounded-lg border transition-colors shadow-md float-right"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </>
  );
}
