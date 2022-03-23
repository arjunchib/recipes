import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import IngredientField from "../../components/IngredientField";
import { supabase } from "../../util/supabaseClient";

type Recipe = {
  id: string;
  name: string;
  author: string;
};

type Ingredient = {
  quantity: string;
  unit: string;
  ingredient: string;
};

export default function Recipe() {
  const router = useRouter();
  const { id } = router.query;

  const [recipe, setRecipe] = useState<Recipe>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (!id) return;
    supabase
      .from<Recipe>("recipes")
      .select("name, author, id")
      .eq("id", id as string)
      .maybeSingle()
      .then(({ data, error }) => {
        setRecipe(data);
      });
  }, [id]);

  const onIngredientChange = (index: number, name: string, value: string) => {
    ingredients[index][name] = value;
  };

  const onNameChange = (e: ChangeEvent) => {
    console.log((e.target as HTMLInputElement).value);
    recipe.name = (e.target as HTMLInputElement).value;
    setRecipe({ ...recipe });
  };

  const ingredientList = ingredients.map((ing, idx) => (
    <IngredientField
      key={idx}
      value={ing}
      onValueChange={(name: string, value: string) =>
        onIngredientChange(idx, name, value)
      }
    />
  ));

  if (!recipe) return <div>Loading...</div>;

  return (
    <form>
      <div className="pb-6">
        <label htmlFor="name" className="block mb-1">
          Title
        </label>
        <input
          className="shadow rounded-lg block w-full"
          id="name"
          type="text"
          value={recipe?.name}
          onChange={onNameChange}
        />
      </div>
      <div className="pb-6">
        <label className="block mb-1">Ingredients</label>
        {ingredientList}
        <IngredientField
          value={{ quantity: "", unit: "", ingredient: "" }}
          onValueChange={(name: string, value: string) => {}}
        />
      </div>
      <div className="pb-6">
        <label htmlFor="content" className="block mb-1">
          Content
        </label>
        <textarea
          className="shadow rounded-lg block w-full"
          id="content"
        ></textarea>
      </div>
      <button className="float-right bg-indigo-700 text-white px-6 py-2 rounded-lg border border-indigo-900 hover:bg-indigo-800 transition-colors shadow-md">
        Save
      </button>
    </form>
  );
}
