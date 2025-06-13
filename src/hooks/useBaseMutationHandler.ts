import { useGlobalStore } from '@/store/globalStore';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

export const UseBaseMutationHandler = () => {
  const { setLoading, setError } = useGlobalStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleMutate = () => {
    setLoading(true);
    setError(null);
  };

  const handleSuccess = (description: string, pathNavigate: string) => {
    toast({
      title: 'Berhasil!',
      description,
      duration: 2000,
    });
    navigate(pathNavigate);
  };

  const handleError = (error: any, fallbackMessage: string) => {
    console.error(error);
    setError(fallbackMessage);
  };

  const handleSettled = () => {
    setLoading(false);
  };

  return {
    toast,
    navigate,
    queryClient,
    handleMutate,
    handleError,
    handleSuccess,
    handleSettled,
  };
};
