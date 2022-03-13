import { useRef } from "react";
import { supabase } from "../util/supabaseClient";

export default function SignIn() {
  const inputEl = useRef(null);

  const handleSignIn = async () => {
    const { user, error } = await supabase.auth.signIn({
      email: inputEl.current.value,
    });
    if (error) console.error(error);
    if (user) console.log(user);
  };

  return (
    <main>
      <div className="shadow-sm max-w-xs rounded-xl overflow-hidden border-black border">
        <input
          className="w-3/4 h-full px-3 py-2  border-0 focus:ring-0"
          placeholder="Email"
          type="email"
          ref={inputEl}
        />
        <button
          className="bg-black text-white w-1/4 h-full py-2  hover:bg-gray-700"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </main>
  );
}
