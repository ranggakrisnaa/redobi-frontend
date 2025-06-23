import { RecommendationFormSchema } from '@/commons/schema/update-recommendation.schema';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  useCreateRecommendation,
  useUpdateRecommendation,
} from '@/hooks/useRecommendation';
import { RefreshCcwDot } from 'lucide-react';
import RecommendationFormPage from './RecommendationForm';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const RecommendationDialogComponent: React.FC<Props> = ({ open, setOpen }) => {
  const { mutate: recommendationMutate } = useCreateRecommendation();
  const { mutate: updateRecommendationMutate } = useUpdateRecommendation();
  // const { setSearch } = useRecommendationStore();

  // const [localSearch, setLocalSearch] = useState('');

  // useEffect(() => {
  //   setSearch(localSearch.trim() || ' ');
  //   const timeoutId = setTimeout(() => {
  //     if (localSearch.trim() === '') {
  //       setSearch('');
  //     }
  //   }, 300);

  //   return () => clearTimeout(timeoutId);
  // }, [localSearch, setSearch]);

  const handleRefreshData = () => {
    recommendationMutate();
  };

  const handleUpdateRecommendation = (data: RecommendationFormSchema) => {
    updateRecommendationMutate(data);
  };

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLocalSearch(e.target.value); // Update local search term
  // };

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
          {/* <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search"
              value={localSearch}
              onChange={handleSearchChange} // Automatically updates search
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div> */}
          <Button
            className="bg-[#166534] hover:bg-[#16A34A] transition-all duration-200"
            onClick={handleRefreshData}
          >
            <RefreshCcwDot className="w-4 h-4 mr-1" /> Perbarui Data
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
