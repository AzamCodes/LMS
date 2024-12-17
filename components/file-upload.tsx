"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: "courseImage" | "courseAttachment" | "chapterVideo";
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  let toastId: string;

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res?.[0]?.url) {
          onChange(res[0].url);
          toast.dismiss(toastId);
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`);
        toast.dismiss(toastId);
      }}
      onUploadBegin={() => {
        toastId = toast.loading("Uploading...");
      }}
    />
  );
};
