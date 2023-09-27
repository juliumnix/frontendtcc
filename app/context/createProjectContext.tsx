"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { DependeciesProps, ProjectData } from "./types.project";

type createProjectContextProps = {
  children: ReactNode;
};

type ContextProps = {
  updateName: (name: String) => void;
  updateRepositoryKey: (repositoryKey: String) => void;
  updateOwnerName: (ownerName: String) => void;
  updateId: (id: String) => void;
  updateArchitecture: (architecture: String) => void;
  updateReactDependencies: (name: String, version: String) => void;
  updateFlutterDependencies: (name: String, version: String) => void;
  updateNeedZIPFile: (needZIPFile: boolean) => void;
  removeReactDependencies: (name: String) => void;
  removeFlutterDependencies: (name: String) => void;
  createProjectStructure: () => void;
  cleanState: () => void;
  clearDependencies: () => void;
};

export const CreateProjectContext = createContext<ContextProps>({
  updateName: () => {},
  updateRepositoryKey: () => {},
  updateOwnerName: () => {},
  updateId: () => {},
  updateArchitecture: () => {},
  updateReactDependencies: () => {},
  updateFlutterDependencies: () => {},
  updateNeedZIPFile: () => {},
  removeReactDependencies: () => {},
  removeFlutterDependencies: () => {},
  createProjectStructure: () => {},
  cleanState: () => {},
  clearDependencies: () => {},
});

export const useCreateProjectContext = () => useContext(CreateProjectContext);

const CreateProjectProvider = ({ children }: createProjectContextProps) => {
  const [name, setName] = useState<String>("");
  const [repositoryKey, setRepositoryKey] = useState<String>("");
  const [ownerName, setOwnerName] = useState<String>("");
  const [id, setId] = useState<String>("");
  const [architecture, setArchitecture] = useState<String>("");
  const [reactDependencies, setReactDependencies] = useState<
    DependeciesProps[]
  >([]);
  const [flutterDependencies, setFlutterDependencies] = useState<
    DependeciesProps[]
  >([]);
  const [needZIPFile, setNeedZIPFile] = useState<boolean>(false);

  const updateName = (name: String) => {
    setName(name);
  };

  const updateRepositoryKey = (repositoryKey: String) => {
    setRepositoryKey(repositoryKey);
  };

  const updateOwnerName = (ownerName: String) => {
    setOwnerName(ownerName);
  };

  const updateId = (id: String) => {
    setId(id);
  };

  const updateArchitecture = (architecture: String) => {
    setArchitecture(architecture);
  };

  const updateReactDependencies = (name: String, version: String) => {
    const projectDependecy: DependeciesProps = {
      name,
      version,
    };
    if (!reactDependencies.find((item) => item.name == name)) {
      setReactDependencies([...reactDependencies, projectDependecy]);
    }
  };

  const updateFlutterDependencies = (name: String, version: String) => {
    const projectDependecy = {
      name,
      version,
    };

    if (!flutterDependencies.find((item) => item.name == name)) {
      setFlutterDependencies([...flutterDependencies, projectDependecy]);
    }
  };

  const updateNeedZIPFile = (needZIPFile: boolean) => {
    setNeedZIPFile(needZIPFile);
  };

  const removeReactDependencies = (name: String) => {
    const removedList = reactDependencies.filter((item) => item.name !== name);
    setReactDependencies(removedList);
  };

  const removeFlutterDependencies = (name: String) => {
    const removedList = flutterDependencies.filter(
      (item) => item.name !== name
    );
    setFlutterDependencies(removedList);
  };

  const clearDependencies = () => {
    setReactDependencies([]);
    setFlutterDependencies([]);
  };

  const createProjectStructure = () => {
    const project = {
      name,
      repositoryKey,
      ownerName,
      id,
      architecture,
      reactDependencies,
      flutterDependencies,
      needZIPFile,
    };
    return project;
  };

  const cleanState = () => {
    setName("");
    setRepositoryKey("");
    setOwnerName("");
    setId("");
    setArchitecture("");
    setReactDependencies([]);
    setFlutterDependencies([]);
    setNeedZIPFile(false);
  };

  return (
    <CreateProjectContext.Provider
      value={{
        updateName,
        updateRepositoryKey,
        updateOwnerName,
        updateId,
        updateArchitecture,
        updateReactDependencies,
        updateFlutterDependencies,
        updateNeedZIPFile,
        removeReactDependencies,
        removeFlutterDependencies,
        createProjectStructure,
        cleanState,
        clearDependencies,
      }}
    >
      {children}
    </CreateProjectContext.Provider>
  );
};

export default CreateProjectProvider;
