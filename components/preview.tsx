"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify"; // Import DOMPurify

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  // Sanitize the value to remove any input elements
  const sanitizedValue = useMemo(() => {
    const cleanValue = value.replace(/<input[^>]*>/g, ""); // Remove <input> elements
    return DOMPurify.sanitize(cleanValue); // Use sanitize to clean the value
  }, [value]);

  return (
    <div className="bg-white rounded-md">
      <div
        className="bg-slate-100 rounded-md p-4"
        // Use dangerouslySetInnerHTML to render sanitized HTML
        dangerouslySetInnerHTML={{ __html: sanitizedValue }}
      />
    </div>
  );
};
