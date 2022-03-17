import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../util/supabaseClient";

type Recipe = {
  id: string;
  name: string;
  author: string;
};

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    supabase
      .from<Recipe>("recipes")
      .select("*")
      .then(({ data, error }) => {
        setRecipes(data);
      });
  }, []);

  const handleNewRecipe = async () => {
    const { data, error } = await supabase
      .from<Recipe>("recipes")
      .insert({ name: "Untitled", author: supabase.auth.user().id });
    if (error) throw error;
    setRecipes([...recipes, data[0]]);
  };

  function tbody(recipes: Recipe[]) {
    return recipes.map((r) => (
      <tr key={r.id}>
        <td className="p-3">{r.name}</td>
        <td className="p-3">
          <Link href={`/recipes/${r.id}`}>
            <a>view</a>
          </Link>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">My Recipes</h1>
        <button
          className="rounded bg-blue-600 text-white px-3 py-1 hover:bg-blue-800 transition-colors"
          onClick={handleNewRecipe}
        >
          New recipe
        </button>
      </div>
      <table className="drop-shadow bg-white w-full rounded-lg my-4">
        <thead className="border-b">
          <tr className="align-left text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Link</th>
          </tr>
        </thead>
        <tbody className="divide-y">{tbody(recipes)}</tbody>
      </table>
    </>
  );
}
