import React from "react";

interface DownloadButtonProps {
  label: string;
  endpoint: string;
  queryParams?: Record<string, string | number>;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ label, endpoint, queryParams }) => {
  const handleDownload = async () => {
    const query = queryParams
      ? "?" +
        new URLSearchParams(queryParams as Record<string, string>).toString()
      : "";
    const url = `${endpoint}${query}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${label}.csv`;
    link.click();
  };

  return <button onClick={handleDownload}>{label}</button>;
};

export default DownloadButton;