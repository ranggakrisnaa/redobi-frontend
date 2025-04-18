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
} from '@/components/ui/alert-dialog';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExitConfirmationComponent = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-data');
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('auth-data');
    navigate('/sign-in');
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition">
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini akan mengeluarkan anda dari aplikasi. Apakah anda yakin
            ingin melanjutkan?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExitConfirmationComponent;
