import React from 'react';
import { useNotification } from '@context/NotificationProvider';
import { AdminService } from '@services/authService';
import DownloadButton from '../shared/DownloadButton';

interface DownloadQuestParticipantsButtonProps {
  questId: string | number;
}

const DownloadQuestParticipantsButton: React.FC<DownloadQuestParticipantsButtonProps> = ({ questId }) => {
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const data = await AdminService.getQuestParticipantsByQuestId({ id: Number(questId) });
      
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quest_${questId}_participants_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showNotification('Quest participants downloaded successfully', 'success');
    } catch (error) {
      console.error('Error downloading quest participants:', error);
      showNotification(
        'Failed to download quest participants',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full sm:w-fit">
        <DownloadButton 
          label="Download Quest Participants" 
          endpoint={() => AdminService.getQuestParticipantsByQuestId({ id: Number(questId) })} 
          queryParams={{ questId: Number(questId) }}
          fileType="json"
          onClick={handleDownload}
        />
      </div>
    </div>
  );
};

export default DownloadQuestParticipantsButton;