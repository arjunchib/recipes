import { PencilIcon, EyeIcon } from "@heroicons/react/outline";
import { useState } from "react";

enum Mode {
  Edit,
  Preview,
}

export default function ToggleInput() {
  let [mode, setMode] = useState(Mode.Edit);

  const baseClass = " rounded px-2.5 py-1.5 ";
  const inactiveClass = " bg-white text-indigo-600 ";
  const activeClass = " bg-indigo-600 text-white ";

  const editClass = () => {
    return mode === Mode.Edit
      ? baseClass + activeClass
      : baseClass + inactiveClass;
  };

  const previewClass = () => {
    return mode === Mode.Preview
      ? baseClass + activeClass
      : baseClass + inactiveClass;
  };

  return (
    <div className="rounded-md p-1 border shadow bg-white flex border-gray-500 hover:shadow-sm transition">
      <button className={editClass()} onClick={() => setMode(Mode.Edit)}>
        <PencilIcon className="w-5" />
      </button>
      <button className={previewClass()} onClick={() => setMode(Mode.Preview)}>
        <EyeIcon className="w-5" />
      </button>
    </div>
  );
}
