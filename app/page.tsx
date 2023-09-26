"use client";
import { ArrowRight } from "lucide-react";
import { ChangeEvent, useState } from "react";
import OpenDependency from "./components/OpenDependency";
import Modal from "./components/Modal";
import ReactModal from "./components/Modals/ReactModal";
import FlutterModal from "./components/Modals/FlutterModal";
import { useCreateProjectContext } from "./context/createProjectContext";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [showModalReactDependencies, setShowModalReactDependencies] =
    useState(false);
  const [showModalFlutterDependencies, setShowModalFlutterDependencies] =
    useState(false);
  const {
    updateName,
    updateId,
    updateArchitecture,
    updateNeedZIPFile,
    createProjectStructure,
  } = useCreateProjectContext();

  const generateUniqueString = () => {
    return Array.from({ length: 7 }, () =>
      Math.random().toString(36).charAt(2)
    ).join("");
  };

  const handleProjectName = (event: ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const nextToAutentication = () => {
    updateName(projectName);
    updateId(generateUniqueString());
    updateArchitecture(selectedOption);
    updateNeedZIPFile(isChecked);
    console.log(createProjectStructure());
  };

  return (
    <main className="h-screen flex">
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-zinc-700 space-y-10 p-10 flex justify-center items-center flex-col border rounded">
          <div className="w-72 flex gap-2 flex-col">
            <label className="text-lg font-semibold mb-2" htmlFor="username">
              Nome do projeto
            </label>
            <input
              className="border rounded w-full py-2 px-3 bg-zinc-800 focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Ex: projetoTeste"
              onChange={(event) => handleProjectName(event)}
            />
          </div>

          <div className="flex gap-3 flex-col">
            <p className="text-lg font-semibold">Arquitetura</p>
            <div className="flex gap-3">
              <label className="text-lg font-semibold">
                <input
                  className="mr-1 "
                  type="radio"
                  value="mvp"
                  checked={selectedOption === "mvp"}
                  onChange={handleOptionChange}
                />
                MVP
              </label>
              <label className="text-lg font-semibold">
                <input
                  className="mr-1"
                  type="radio"
                  value="mvvm"
                  checked={selectedOption === "mvvm"}
                  onChange={handleOptionChange}
                />
                MVVM
              </label>
              <label className="text-lg font-semibold">
                <input
                  className="mr-1"
                  type="radio"
                  value="completo"
                  checked={selectedOption === "completo"}
                  onChange={handleOptionChange}
                />
                Projeto completo
              </label>
            </div>
          </div>
          <div className=" flex text-lg font-semibold gap-4">
            Deseja criar um ZIP do projeto?
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </div>
          {selectedOption !== "completo" && (
            <>
              <OpenDependency
                title={"Adicionar dependencias do React"}
                onClick={() => {
                  setShowModalReactDependencies(!showModalReactDependencies);
                }}
              />
              <OpenDependency
                title={"Adicionar dependencias do Flutter"}
                onClick={() => {
                  setShowModalFlutterDependencies(
                    !showModalFlutterDependencies
                  );
                }}
              />
            </>
          )}
          <button
            onClick={() => nextToAutentication()}
            className="w text-2xl p-4 font-bold gap-4 border-2 border-blue-400 flex justify-center items-center rounded text-blue-400 hover:border-blue-300 hover:text-blue-300 transition-colors"
          >
            Autenticar
            <ArrowRight width={36} height={36} />
          </button>
        </div>
      </div>
      <ReactModal
        isVisible={showModalReactDependencies}
        onClose={() =>
          setShowModalReactDependencies(!showModalReactDependencies)
        }
      />
      <FlutterModal
        isVisible={showModalFlutterDependencies}
        onClose={() =>
          setShowModalFlutterDependencies(!showModalFlutterDependencies)
        }
      />
    </main>
  );
}
