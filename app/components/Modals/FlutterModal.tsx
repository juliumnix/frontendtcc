import { ArrowRight } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import Modal from "../Modal";

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

  const handleDependencyName = (event: ChangeEvent<HTMLInputElement>) => {
    setDependency(event.target.value);
  };

  const handleOnCloseEvents = () => {
    setResults([]);
    onClose();
  };

  // const fetchData = async () => {
  //   const url = `https://pub.dev/api/package-name-completion-data`;

  //   try {
  //     const headers = new Headers();
  //     headers.append("Accept-Encoding", "gzip");
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: headers,
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Erro HTTP! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     setResults(data);
  //   } catch (error) {
  //     console.error("Erro ao buscar dados:", error);
  //   }
  // };

  async function fetchData() {
    const url = "https://pub.dev/api/package-names";

    try {
      const response = await fetch(url, {
        headers: {
          "accept-encoding": "gzip",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      // Verifique o cabeçalho "content-encoding" para determinar se a resposta está codificada em gzip
      const contentEncoding = response.headers.get("content-encoding");

      if (contentEncoding === "gzip") {
        // A resposta está codificada em gzip, você pode descomprimi-la se necessário
        const buffer = await response.arrayBuffer();
        // Aqui, você pode descomprimir o buffer do gzip conforme necessário
        // Por exemplo, usando a biblioteca 'zlib' ou outra biblioteca de descompressão
      }

      const data = await response.json();
      console.log(data);
      // Faça algo com os dados aqui
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  const handleClickItem = (item: any) => {
    console.log(item.package.name);
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
          onClick={() => fetchData()}
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
                onClick={() => handleClickItem(item)}
                key={index}
                className="flex w-96 border p-2 rounded hover:bg-zinc-600 mb-2"
              >
                <h1 className="text-left">{item}</h1>
                {/* <h1 className="ml-auto">{item.package.version}</h1> */}
              </button>
            </>
          ))}
        </div>
      </div>
    </Modal>
  );
}
