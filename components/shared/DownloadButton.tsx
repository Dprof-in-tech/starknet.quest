import React from "react";
import { useNotification } from "@context/NotificationProvider";
import Button from "@components/UI/button";
interface DownloadButtonProps {
  label: string;
  endpoint: `/api/${string}`;
  queryParams?: Record<string, string | number>;
  fileType?: 'csv' | 'json';
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ label, endpoint, queryParams, fileType = 'csv' }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { showNotification } = useNotification();
  const abortControllerRef = React.useRef<AbortController>();

  const handleDownload = async () => {
    setIsLoading(true);
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    try {
      const query = queryParams
        ? "?" +
          new URLSearchParams(queryParams as Record<string, string>).toString()
        : "";
      const url = `${endpoint}${query}`;
      const response = await fetch(url, {
        signal: abortControllerRef.current.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      const expectedTypes = {
        'csv': 'text/csv',
        'json': 'application/json'
      };

      if (!contentType?.includes(expectedTypes[fileType])) {
        throw new Error(`Invalid content-type: ${contentType}`);
      }
      
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${label}.${fileType}`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
      showNotification('Download failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return (
    <Button onClick={handleDownload} disabled={isLoading}>
      {isLoading ? "Downloading..." : label}
    </Button>
  );
};

export default DownloadButton;