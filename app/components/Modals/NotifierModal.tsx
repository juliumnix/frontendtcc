import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { ArrowRight, FileDown, RotateCw } from "lucide-react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { GlobalURL } from "@/url";
import receptServer from "@/serverConfig";
import { useCreateProjectContext } from "@/app/context/createProjectContext";
import { useRouter } from "next/navigation";
import createAPIInstance from "@/axios";
import { saveAs } from "file-saver";

type NotifierModalProps = {
  isVisible: boolean;
  running: boolean;
  setRunning: (state: boolean) => void;
  onClose: () => void;
};

export default function NotifierModal({
  isVisible,
  running,
  setRunning,
  onClose,
}: NotifierModalProps) {
  const [finished, setFinished] = useState(false);
  const [events, setEvents] = useState("");
  const serverURL = receptServer(GlobalURL);
  const { id, needZIPFile, cleanState } = useCreateProjectContext();
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      await fetchEventSource(`${serverURL}/server-events/${id}`, {
        method: "get",
        headers: {
          Accept: "text/event-stream",
        },
        signal: controller.signal,

        async onmessage(event) {
          console.log(event.data);
          const parsedData = JSON.parse(event.data);
          console.log(parsedData.message);
          setEvents(parsedData.message);
          // You can remove this condition to keep the connection open
          if (
            parsedData.message ==
            "Projeto criado e enviado para o Github, aproveite =)"
          ) {
            controller.abort();
            setFinished(true);
            setRunning(false);
            await fetchEndpoint();
            return;
          }
        },
        onclose() {
          console.log("Connection closed by the server");
        },
        onerror(err) {
          console.log("There was an error from the server", err);
        },
      });
    };
    if (running) {
      fetchData();
    }

    return () => controller.abort();
  }, [running]);

  async function fetchEndpoint() {
    const url = `${serverURL}/server-events/remove/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.removed);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  const handleDownload = async () => {
    const api = createAPIInstance(serverURL);
    const response = await api.get(`${serverURL}/${id}/download-zip`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);

    const fileName = "seuarquivo.zip";
    saveAs(blob, fileName);
  };

  const handleCreateNewProject = () => {
    cleanState();
    onClose();
    router.push("/");
  };

  return (
    <Modal isVisible={isVisible} onClose={() => {}}>
      <div className="flex flex-col gap-2 h-auto justify-center w-auto items-center p-6">
        <p className="text-2xl text-center w-96 break-all pb-6">{events}</p>

        {finished && (
          <>
            <button
              onClick={() => handleCreateNewProject()}
              className="w text-2xl p-4 font-bold gap-4 border-2 border-blue-400 flex justify-center items-center rounded text-blue-400 hover:border-blue-300 hover:text-blue-300 transition-colors"
            >
              Fazer novo projeto
              <RotateCw width={36} height={36} />
            </button>
            {needZIPFile && (
              <button
                onClick={() => handleDownload()}
                className="w text-2xl p-4 font-bold gap-4 border-2 border-blue-400 flex justify-center items-center rounded text-blue-400 hover:border-blue-300 hover:text-blue-300 transition-colors"
              >
                Baixar ZIP do projeto
                <FileDown width={36} height={36} />
              </button>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}
