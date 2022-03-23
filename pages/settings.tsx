import { useRef } from "react";
import { supabase } from "../util/supabaseClient";

export default function SignIn() {
  const password = useRef(null);

  const handleSave = async () => {
    const { user, error } = await supabase.auth.update({
      password: password.current.value,
    });
    if (error) console.error(error);
    if (user) console.log(user);
  };

  return (
    <>
      <div className="pb-6">
        <label htmlFor="password" className="block mb-1">
          New Password
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
        onClick={handleSave}
      >
        Save
      </button>
    </>
  );
}
