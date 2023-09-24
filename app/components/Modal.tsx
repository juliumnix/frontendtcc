import React, { ChangeEvent, useState } from "react";

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({
  isVisible,
  onClose,
  children,
  ...rest
}: ModalProps) {
  if (!isVisible) return null;

  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as HTMLDivElement).id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={(event) => handleClose(event)}
    >
      <div className="w-auto flex flex-col">
        <button onClick={onClose} className="text-white text-xl place-self-end">
          X
        </button>
        <div className="bg-zinc-700 border p-2 rounded">{children}</div>
      </div>
    </div>
  );
}
