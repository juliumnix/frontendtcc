"use client";

import axios from "axios";
import receptServer from "../serverConfig";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import createAPIInstance from "@/axios";
import { GlobalURL } from "@/url";
import Loading from "./components/Loading";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    getAvailableServer();
  }, []);

  const getAvailableServer = async () => {
    const serverURL = receptServer(GlobalURL);
    const api = createAPIInstance(serverURL);
    const response = await api.get(`${serverURL}/api/available`);
    if (response.data.status == true) {
      router.push("/creation");
    }
  };

  return (
    <main className="h-screen flex justify-center">
      <Loading width={16} height={16} />
    </main>
  );
}
