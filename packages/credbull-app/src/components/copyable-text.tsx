"use client";

import { useState } from "react";

export default function CopyableText({
  text,
  label,
}: {
  text: string;
  label?: string; // Optional label to display above the text
}) {
  const [notification, setNotification] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setNotification("Copied to clipboard!");
    setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
  };

  return (
    <div>
      {label && <span className="text-sm text-base-content/70">{label}:</span>}
      <div
        className="text-lg cursor-pointer hover:underline"
        onClick={handleCopy}
      >
        {text}
      </div>
      {notification && (
        <div className="toast toast-start">
          <div className="alert alert-neutral shadow-lg">{notification}</div>
        </div>
      )}
    </div>
  );
}
