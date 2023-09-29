import { ArrowRight } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { useCreateProjectContext } from "@/app/context/createProjectContext";

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
  const [isLoading, setIsLoading] = useState(false);
  const { updateFlutterDependencies } = useCreateProjectContext();

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
    try {
      setIsLoading(true);
      const packages = await fetchData();
      const filter = packages.filter((item: String) =>
        item.toLowerCase().includes(dependency.toLowerCase())
      );
      setResults(filter);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (item: String) => {
    try {
      const response = await axios.get(`/flutter/${item}`);
      updateFlutterDependencies(item, response.data.latest.version);
      onClose();
    } catch (error) {}
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
                onClick={() => {
                  handleClick(item);
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
