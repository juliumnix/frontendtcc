import { Plus } from "lucide-react";
import React from "react";

type OpenDependecyType = {
  title: String;
  onClick: () => void;
};

export default function OpenDependency({ title, onClick }: OpenDependecyType) {
  return (
    <div className="flex flex-col gap-4 w-72">
      <p className="text-center text-lg font-semibold">{title}</p>
      <button
        onClick={onClick}
        className="justify-center border-2 items-center font-semibold border-green-600 flex p-3 rounded text-green-600 hover:border-green-400 hover:text-green-400 transition-colors"
      >
        <Plus />
        Adicionar
      </button>
    </div>
  );
}
