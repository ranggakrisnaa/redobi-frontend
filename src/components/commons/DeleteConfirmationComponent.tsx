import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

type DeleteConfirmationDialogProps = {
  onConfirm: () => void;
  isSingle: boolean;
};

const DeleteConfirmationComponent: React.FC<DeleteConfirmationDialogProps> = ({
  onConfirm,
  isSingle,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isSingle ? (
          <button className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
        ) : (
          <Button className="bg-error-500 hover:!bg-[#d87824] transition-all duration-200">
            <Trash2 className="w-4 h-4 mr-1" /> Hapus Data
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data yang
            telah dipilih secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Hapus</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationComponent;
