import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../util/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export default function Home() {
  return (
    <>
      <h1>Welcome to Recipes</h1>
    </>
  );
}
