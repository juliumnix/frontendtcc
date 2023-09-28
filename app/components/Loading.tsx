import React from "react";

type LoadingProps = {
  width: number;
  height: number;
};

export default function Loading({ width, height }: LoadingProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-${width} h-${height} border-t-4 border-blue-500 border-solid rounded-full animate-spin`}
      />
    </div>
  );
}
