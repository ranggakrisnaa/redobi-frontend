import { Loader, Trash2 } from 'lucide-react';
import { useState } from 'react';
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
  onConfirm: () => Promise<boolean>;
  isSingle: boolean;
};

const DeleteConfirmationComponent: React.FC<DeleteConfirmationDialogProps> = ({
  onConfirm,
  isSingle,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const result = await onConfirm();
      if (result) {
        setOpen(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(newOpen) => {
        if (isLoading && open && !newOpen) return;
        setOpen(newOpen);
      }}
    >
      <AlertDialogTrigger asChild>
        {isSingle ? (
          <button className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
        ) : (
          <Button className="bg-error-500 hover:bg-[#d87824] transition-all duration-200">
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
          <AlertDialogCancel disabled={isLoading}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              'Hapus'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationComponent;
