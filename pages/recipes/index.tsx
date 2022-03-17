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
        <td>{r.name}</td>
        <td>
          <Link href={`/recipes/${r.id}`}>view</Link>
        </td>
      </tr>
    ));
  }

  return (
    <main>
      <div>
        <h1>Recipes</h1>
        <button onClick={handleNewRecipe}>New recipe</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{tbody(recipes)}</tbody>
      </table>
    </main>
  );
}
