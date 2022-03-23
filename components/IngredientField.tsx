import { ChangeEvent } from "react";

interface Props {
  value: {
    quantity: string;
    unit: string;
    ingredient: string;
  };
  onValueChange: (name: string, value: string) => void;
}

export default function IngredientField(props: Props) {
  const id = 0;

  const handleChange = (name: string, e: ChangeEvent) => {
    props.onValueChange(name, (e.target as HTMLInputElement).value);
  };

  return (
    <div className="flex my-4 shadow rounded-lg w-full overflow-hidden border border-gray-500 divide-x divide-gray-500 bg-white">
      <div className="flex flex-col flex-1">
        <label
          htmlFor={`quantity-${id}`}
          className="font-medium text-sm px-3 pt-2 pb-0 tracking-tight"
        >
          Quantity
        </label>
        <input
          className="border-0 w-full focus:ring-0 focus:border-gray-500 pt-0"
          type="text"
          id={`quantity-${id}`}
          placeholder="3 1/2"
          value={props.value.quantity}
          onChange={(e) => handleChange("quantity", e)}
        />
      </div>
      <div className="flex flex-col flex-1">
        <label
          htmlFor={`unit-${id}`}
          className="font-medium text-sm px-3 pt-2 pb-0 tracking-tight"
        >
          Unit
        </label>
        <input
          className="border-0 w-full focus:ring-0 focus:border-gray-500 pt-0"
          type="text"
          id={`unit-${id}`}
          placeholder="cups"
          value={props.value.unit}
          onChange={(e) => handleChange("unit", e)}
        />
      </div>
      <div className="flex flex-col flex-1">
        <label
          htmlFor={`ingredient-${id}`}
          className="font-medium text-sm px-3 pt-2 pb-0 tracking-tight"
        >
          Ingredient
        </label>
        <input
          className="border-0 w-full focus:ring-0 focus:border-gray-500 pt-0"
          type="text"
          id={`ingredient-${id}`}
          placeholder="milk"
          value={props.value.ingredient}
          onChange={(e) => handleChange("ingredient", e)}
        />
      </div>
      <button
        className="rounded-r-lg bg-gray-100 px-4 min-w-[6rem]"
        type="button"
      >
        Remove
      </button>
    </div>
  );
}
