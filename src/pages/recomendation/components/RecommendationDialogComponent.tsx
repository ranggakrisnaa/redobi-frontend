import { RecommendationFormSchema } from '@/commons/schema/update-recommendation.schema';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLecturerPagination } from '@/hooks/useLecturer';
import {
  usePaginationRecommendations,
  useUpdateRecommendation,
} from '@/hooks/useRecommendation';
import { RefreshCcwDot } from 'lucide-react';
import React, { useState } from 'react';
import RecommendationFormPage from './RecommendationForm';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const RecommendationDialogComponent: React.FC<Props> = ({ open, setOpen }) => {
  // const { mutate: recommendationMutate } = useCreateRecommendation();
  const { mutate: updateRecommendationMutate } = useUpdateRecommendation();

  const { refetch: refetchRecommendations } = usePaginationRecommendations();
  const { refetch: refetchLecturers } = useLecturerPagination();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshData = async () => {
    try {
      setIsRefreshing(true);

      await Promise.all([refetchRecommendations(), refetchLecturers()]);

      console.log('Data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleUpdateRecommendation = (data: RecommendationFormSchema) => {
    updateRecommendationMutate(data, {
      onSuccess: () => {
        console.log('Update successful');
      },
      onError: (error) => {
        console.error('Update failed:', error);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-6xl w-full max-h-[90vh] flex flex-col"
        forceMount
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Data Hasil Rekomendasi</DialogTitle>
        </DialogHeader>
        <div className="border-b" />

        <div className="flex gap-3 justify-end">
          <Button
            className="bg-[#166534] hover:bg-[#16A34A] transition-all duration-200"
            onClick={handleRefreshData}
            disabled={isRefreshing}
          >
            <RefreshCcwDot
              className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            {isRefreshing ? 'Memperbarui...' : 'Perbarui Data'}
          </Button>
        </div>

        <div className="flex-1 overflow-hidden">
          <RecommendationFormPage
            onSuccess={handleUpdateRecommendation}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationDialogComponent;
