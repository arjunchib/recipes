import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../util/supabaseClient";
import { ChevronRightIcon } from "@heroicons/react/solid";

type SupabaseRecipe = {
  id: string;
  name: string;
  content: string;
  author: string;
  recipe_ingredients: {
    quantity: string;
    unit: string;
    ingredients: {
      name: string;
    };
  }[];
};

export default function Recipes() {
  const [recipes, setRecipes] = useState<SupabaseRecipe[]>([]);

  useEffect(() => {
    supabase
      .from<SupabaseRecipe>("recipes")
      .select(
        "name, author, id, content, recipe_ingredients(quantity, unit, ingredients(name))"
      )
      .then(({ data, error }) => {
        setRecipes(data);
      });
  }, []);

  const handleNewRecipe = async () => {
    const { data, error } = await supabase
      .from<SupabaseRecipe>("recipes")
      .insert({
        name: "Untitled",
        content: "",
        author: supabase.auth.user().id,
      });
    if (error) throw error;
    setRecipes([...recipes, data[0]]);
  };

  function list(recipes: SupabaseRecipe[]) {
    return recipes.map((r) => {
      const ingredients = r.recipe_ingredients.map((ri) => ri.ingredients.name);
      const desc = ingredients.length ? (
        <em className="text-gray-400"> - {ingredients.join(", ")}</em>
      ) : undefined;
      return (
        <Link key={r.id} href={`/recipes/${r.id}`}>
          <a className="group p-3 hover:shadow flex justify-between">
            <div>
              {r.name}
              {desc}
            </div>
            <ChevronRightIcon className="text-gray-400 h-[1.5em] group-hover:text-gray-800" />
          </a>
        </Link>
      );
    });
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">My Recipes</h1>
      </div>
      <div className="rounded-md my-3 bg-white divide-y divide-gray-500 transition border border-gray-500">
        {list(recipes)}
      </div>
      <button className="btn btn-primary float-right" onClick={handleNewRecipe}>
        New recipe
      </button>
    </>
  );
}
