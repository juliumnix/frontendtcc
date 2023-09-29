import React from "react";

type LoadingProps = {
  width: number;
  height: number;
};

export default function Loading({ width, height }: LoadingProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-72 h-72 border-t-4 border-blue-500 border-solid rounded-full animate-spin`}
      />
    </div>
  );
}
