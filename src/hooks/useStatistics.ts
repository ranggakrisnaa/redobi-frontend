import { getStatistics } from '@/services/statisticService';
import { useQuery } from '@tanstack/react-query';

export const useGetStatistics = () => {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      return await getStatistics();
    },
    staleTime: 5 * 60 * 1000,
  });
};
