import React, { ChangeEvent, Key, useEffect, useState } from "react";
import Modal from "../Modal";
import { ArrowRight } from "lucide-react";
import { useCreateProjectContext } from "@/app/context/createProjectContext";
import Loading from "../Loading";

type ReactModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

type ResultsProps = {
  package: {
    name: String;
    version: String;
  };
};
export default function ReactModal({ isVisible, onClose }: ReactModalProps) {
  const [results, setResults] = useState<ResultsProps[]>([]);
  const [dependency, setDependency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateReactDependencies } = useCreateProjectContext();

  const handleDependencyName = (event: ChangeEvent<HTMLInputElement>) => {
    setDependency(event.target.value);
  };

  const fetchData = async () => {
    const searchText = dependency.replace(/\s/g, "-");
    const url = `https://registry.npmjs.org/-/v1/search?text=${searchText}`;

    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.objects);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnCloseEvents = () => {
    setResults([]);
    onClose();
  };

  const handleClickItem = (item: ResultsProps) => {
    updateReactDependencies(item.package.name, item.package.version);
    handleOnCloseEvents();
  };

  return (
    <Modal isVisible={isVisible} onClose={handleOnCloseEvents}>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold mb-2" htmlFor="username">
          Nome da dependencia
        </label>
        <input
          className="border w-96 rounded py-2 px-3 bg-zinc-800 focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Ex: axios"
          onChange={(event) => handleDependencyName(event)}
        />

        <button
          className="text-lg w-96 p-2 font-bold gap-4 border-2 border-blue-400 flex justify-center items-center rounded text-blue-400 hover:border-blue-300 hover:text-blue-300 transition-colors"
          onClick={() => fetchData()}
        >
          {isLoading ? (
            <>
              <div
                className={`w-7 h-7 border-t-4 border-blue-500 border-solid rounded-full animate-spin`}
              />
            </>
          ) : (
            <>
              Buscar
              <ArrowRight />
            </>
          )}
        </button>
        <div
          className={`overflow-y-scroll no-scrollbar ${
            results.length > 0 ? "h-96" : "h-0"
          } transition-height duration-500 ease-in-out`}
        >
          {results.map((item, index) => (
            <>
              <button
                onClick={() => handleClickItem(item)}
                key={index}
                className="flex w-96 border p-2 rounded hover:bg-zinc-600 mb-2"
              >
                <h1 className="text-left">{item.package.name}</h1>
                <h1 className="ml-auto">{item.package.version}</h1>
              </button>
            </>
          ))}
        </div>
      </div>
    </Modal>
  );
}
