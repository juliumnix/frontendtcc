"use client";
import { ArrowRight } from "lucide-react";
import { useCreateProjectContext } from "../../context/createProjectContext";
import React, { ChangeEvent, useState } from "react";
import NotifierModal from "@/app/components/Modals/NotifierModal";
import { GlobalURL } from "@/url";
import receptServer from "@/serverConfig";
import createAPIInstance from "@/axios";

export default function GithubAutentication() {
  const [notifierModal, setNotifierModal] = useState(false);
  const [running, setRunning] = useState(false);
  const { createProjectStructure, updateRepositoryKey, updateOwnerName } =
    useCreateProjectContext();

  const handleOwnerName = (event: ChangeEvent<HTMLInputElement>) => {
    updateOwnerName(event.target.value);
  };

  const handleRepositoryKey = (event: ChangeEvent<HTMLInputElement>) => {
    updateRepositoryKey(event.target.value);
  };

  const handleCreateProject = async () => {
    setRunning(true);
    setNotifierModal(true);
    const serverURL = receptServer(GlobalURL);
    const api = createAPIInstance(serverURL);
    await api.post(`${serverURL}/create`, createProjectStructure());
  };

  return (
    <main className="h-screen flex">
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-zinc-700 space-y-10 p-10 flex justify-center items-center flex-col border rounded">
          <div className="w-72 flex gap-2 flex-col">
            <label className="text-lg font-semibold mb-2" htmlFor="ownername">
              Nome do dono do repositório
            </label>
            <input
              className="border rounded w-full py-2 px-3 bg-zinc-800 focus:outline-none focus:shadow-outline"
              id="ownername"
              type="text"
              placeholder="Ex: nome-do-usuario"
              onChange={(event) => {
                handleOwnerName(event);
              }}
            />
          </div>

          <div className="w-72 flex gap-2 flex-col">
            <label className="text-lg font-semibold mb-2" htmlFor="githubid">
              Digite aqui seu token do{" "}
              <a
                className="underline"
                href="https://github.com/settings/tokens"
                target="_blank"
              >
                GitHub
              </a>
            </label>
            <input
              className="border rounded w-full py-2 px-3 bg-zinc-800 focus:outline-none focus:shadow-outline"
              id="githubid"
              type="text"
              placeholder="Ex: ghp_ABCDEFGHIJK123456789"
              onChange={(event) => {
                handleRepositoryKey(event);
              }}
            />
          </div>
          <button
            onClick={() => {
              handleCreateProject();
            }}
            className="w text-2xl p-4 font-bold gap-4 border-2 border-blue-400 flex justify-center items-center rounded text-blue-400 hover:border-blue-300 hover:text-blue-300 transition-colors"
          >
            Criar seu projeto
            <ArrowRight width={36} height={36} />
          </button>
        </div>
      </div>
      <NotifierModal
        isVisible={notifierModal}
        onClose={() => {
          setNotifierModal(false);
        }}
        running={running}
        setRunning={setRunning}
      />
    </main>
  );
}
