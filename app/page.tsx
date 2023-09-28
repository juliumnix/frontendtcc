"use client";

import axios from "axios";
import receptServer from "../serverConfig";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import createAPIInstance from "@/axios";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    getAvailableServer();
  }, []);

  const getAvailableServer = async () => {
    const serverURL = receptServer("production");
    const api = createAPIInstance("production");
    const response = await api.get(`${serverURL}/api/available`);
    if (response.data.status == true) {
      router.push("/creation");
    }
  };

  return (
    <main className="h-screen flex justify-center">
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </main>
  );
}
