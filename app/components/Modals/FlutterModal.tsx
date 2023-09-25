import { ArrowRight } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import Modal from "../Modal";
import axios from "axios";

type FlutterModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function FlutterModal({
  isVisible,
  onClose,
}: FlutterModalProps) {
  const [results, setResults] = useState<String[]>([]);
  const [dependency, setDependency] = useState("");

  async function fetchData() {
    try {
      const response = await axios.get("/getNames");
      const data = response.data.packages;
      return data;
    } catch (error) {
      console.error("Erro ao buscar pacotes:", error);
    }
  }

  const handleDependencyName = (event: ChangeEvent<HTMLInputElement>) => {
    setDependency(event.target.value);
  };

  const handleOnCloseEvents = () => {
    setResults([]);
    onClose();
  };

  const handleDependencySearch = async () => {
    const packages = await fetchData();
    const filter = packages.filter((item: String) =>
      item.toLowerCase().includes(dependency.toLowerCase())
    );
    setResults(filter);
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
          className="w text-lg w-96 p-2 font-bold gap-4 border-2 border-blue-400 flex justify-center items-center rounded text-blue-400 hover:border-blue-300 hover:text-blue-300 transition-colors"
          onClick={() => handleDependencySearch()}
        >
          Buscar
          <ArrowRight />
        </button>
        <div
          className={`overflow-y-scroll no-scrollbar ${
            results.length > 0 ? "h-96" : "h-0"
          } transition-height duration-500 ease-in-out`}
        >
          {results.map((item, index) => (
            <>
              <button
                onClick={() => {
                  console.log(item);
                }}
                key={index}
                className="flex w-96 border p-2 rounded hover:bg-zinc-600 mb-2"
              >
                <h1 className="text-left">{item}</h1>
              </button>
            </>
          ))}
        </div>
      </div>
    </Modal>
  );
}
