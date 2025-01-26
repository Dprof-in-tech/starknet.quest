import React from "react";
import { useNotification } from "@context/NotificationProvider";
import { AdminService } from '@services/authService';
import DownloadButton from '../shared/DownloadButton';

type DownloadBoostWinnersButtonProps = {
  boostId: string;
};

const DownloadBoostWinnersButton: React.FC<DownloadBoostWinnersButtonProps> = ({ boostId }) => {
  const { showNotification } = useNotification();

  const handleDownload = async () => {
    try {
      const data = await AdminService.getBoostWinnersByBoostId({ id: Number(boostId) });

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `boost_${boostId}_winners.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading boost winners:", error);
      showNotification("Failed to download boost winners.", "error");
    }
  };

  return (
    <DownloadButton 
    label="Download Boost Winners" 
    endpoint={() => AdminService.getBoostWinnersByBoostId({ id: Number(boostId) })} // Use existing method
    queryParams={{ boostId: Number(boostId) }} 
    fileType="json" // Specify the file type for download
    onClick={handleDownload}
  />
  );
};

export default DownloadBoostWinnersButton;