"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import ReactQuill from "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ onChange, value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill
        theme="bubble"
        className="bg-slate-100"
        value={value}
        readOnly
      />
    </div>
  );
};
