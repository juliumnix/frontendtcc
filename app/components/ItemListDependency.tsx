import { Trash2 } from "lucide-react";
import React from "react";

type ItemListDependencyProps = {
  name: String;
  version: String;
  onClickDelete: () => void;
};

export default function ItemListDependency({
  name,
  version,
  onClickDelete,
}: ItemListDependencyProps) {
  return (
    <div className=" border rounded min-w-full text-blue-500 flex p-3">
      <p>{name}</p>
      <div className="flex gap-2 ml-auto">
        <p>{version}</p>
        <button
          onClick={() => {
            onClickDelete();
          }}
          className="hover:text-red-300 transition-colors"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
