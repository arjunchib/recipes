import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import IngredientField from "../../components/IngredientField";
import { supabase } from "../../util/supabaseClient";

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

type Recipe = {
  id: string;
  name: string;
  content: string;
  author: string;
  ingredients: Ingredient[];
};

interface Ingredient {
  quantity: string;
  unit: string;
  name: string;
}

export default function Recipe() {
  const router = useRouter();
  const id = router.query.id as string;
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    if (!id) return;
    supabase
      .from<SupabaseRecipe>("recipes")
      .select(
        "name, author, id, content, recipe_ingredients(quantity, unit, ingredients(name))"
      )
      .eq("id", id as string)
      .maybeSingle()
      .then(({ data, error }) => {
        console.log(data || error);
        const { id, name, content, author } = data;
        const ingredients = data.recipe_ingredients.map((ri) => {
          const { quantity, unit } = ri;
          return { quantity, unit, name: ri.ingredients.name };
        });
        ingredients.push({
          quantity: "",
          unit: "",
          name: "",
        });
        setRecipe({ id, name, content, author, ingredients });
      });
  }, [id]);

  const onNameChange = (e: ChangeEvent) => {
    recipe.name = (e.target as HTMLInputElement).value;
    setRecipe({ ...recipe });
  };

  const onContentChange = (e: ChangeEvent) => {
    recipe.content = (e.target as HTMLInputElement).value;
    setRecipe({ ...recipe });
  };

  const onIngredientChange = (index: number, value: Ingredient) => {
    recipe.ingredients[index] = value;
    if (
      recipe.ingredients.length === 0 ||
      recipe.ingredients[recipe.ingredients.length - 1].name
    ) {
      recipe.ingredients.push({
        quantity: "",
        unit: "",
        name: "",
      });
    }
    setRecipe({ ...recipe });
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    // TODO: Should probably turn into a postgres function when avaialable

    // Remove empty recipes
    recipe.ingredients = recipe.ingredients.filter((i) => i.name);

    // Get current ingredients
    let { data, error } = await supabase
      .from("ingredients")
      .select("name")
      .in(
        "name",
        recipe.ingredients.map((i) => i.name)
      );
    const currentIngredients = data.map((i) => i.name);

    // Insert new ingredients
    const newIngredients = recipe.ingredients
      .filter((i) => !currentIngredients.includes(i.name))
      .map((i) => {
        return { name: i.name };
      });
    ({ data, error } = await supabase
      .from("ingredients")
      .insert(newIngredients));

    // Upsert recipes_ingredients
    const recipe_ingredients = recipe.ingredients.map((i, idx) => {
      return {
        recipe_id: recipe.id,
        ingredient_name: i.name,
        quantity: i.quantity,
        unit: i.unit,
        order: idx,
      };
    });
    ({ data, error } = await supabase
      .from("recipe_ingredients")
      .upsert(recipe_ingredients));

    // Update recipe
    await supabase
      .from<Recipe>("recipes")
      .update({
        name: recipe.name,
        content: recipe.content,
      })
      .eq("id", id);
  };

  const ingredientList = recipe?.ingredients.map((ing, idx) => (
    <IngredientField
      key={idx}
      value={ing}
      onChange={(value) => onIngredientChange(idx, value)}
    />
  ));

  if (!recipe) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSave}>
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
      </div>
      <div className="pb-6">
        <label htmlFor="content" className="block mb-1">
          Content
        </label>
        <textarea
          className="shadow rounded-lg block w-full"
          id="content"
          value={recipe?.content}
          onChange={onContentChange}
        ></textarea>
      </div>
      <button className="float-right bg-indigo-700 text-white px-6 py-2 rounded-lg border border-indigo-900 hover:bg-indigo-800 transition-colors shadow-md">
        Save
      </button>
    </form>
  );
}
