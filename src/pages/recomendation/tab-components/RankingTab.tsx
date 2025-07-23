import { rankingColumn } from '@/commons/constants/recommendation/table-column-data.constant';
import { IRankingMatrices } from '@/commons/interface-model/ranking-matrices-entity.interface';
import DataManagementComponent from '@/components/commons/DataManagementComponent';
import LoadingComponent from '@/components/commons/LoadingComponent';
import PaginationComponent from '@/components/commons/PaginationComponent';
import TableComponent from '@/components/commons/TableComponent';
import {
  useCreateNormalization,
  useCreateRankingMatrices,
  useDeleteRankingMatrices,
  usePaginationRankingMatrices,
} from '@/hooks/useRecommendation';
import { useGlobalStore } from '@/store/globalStore';
import { useRecommendationStore } from '@/store/recommendationStore';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const RankingTab = () => {
  const { mutate: normalizationMutate } = useCreateNormalization();
  const { mutate: rankingMutate } = useCreateRankingMatrices();
  const { selected, setSelected, setIsSearch } = useGlobalStore();
  const {
    data: rankingsData,
    isLoading,
    isError,
    error,
  } = usePaginationRankingMatrices();
  const { mutateAsync: deleteMutate } = useDeleteRankingMatrices();
  const { currentPage, pageSize, setPage, setPageSize, setSearch } =
    useRecommendationStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setPage(1);
  }, [setPage]);

  useEffect(() => {
    setIsSearch(null);
  }, [setIsSearch]);

  useEffect(() => {
    setSearch('');
  }, [setSearch]);

  const formattedData =
    rankingsData?.data
      .map((ranking: IRankingMatrices) => ({
        id: ranking.id,
        lecturerName: ranking.lecturer?.fullName,
        finalScore: ranking.finalScore,
        rank: ranking.rank,
      }))
      .sort((a, b) => a.rank - b.rank) || [];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const createParams = params.get('create');

    if (createParams) {
      normalizationMutate();
      rankingMutate();

      params.delete('create');
      const newUrl =
        window.location.pathname +
        (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState({}, '', newUrl);
    }
  }, [normalizationMutate, rankingMutate]);

  const updateURL = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        newParams.set(key, params[key]);
      } else {
        newParams.delete(key);
      }
    });

    setIsSearch(params);
    setSearchParams(newParams, { replace: true });
  };

  const handleCreateRanking = () => {
    rankingMutate();
  };

  const handleDeleteRanking = async () => {
    try {
      await deleteMutate(selected as unknown as string[]);
      setSelected([]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSearchChange = (search: string) => {
    setPage(1);
    setSearch(search);
    updateURL({ search });
  };

  return (
    <div>
      <DataManagementComponent
        onClickCreate={handleCreateRanking}
        excludeImportExport={true}
        onClickDelete={handleDeleteRanking}
        onSearchChange={handleSearchChange}
        titleDialog="Nomalisasi Matriks"
        isMatriks={true}
      />
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <LoadingComponent />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500 mt-3">{error.message}</p>
      ) : (
        <TableComponent
          data={formattedData}
          columns={rankingColumn}
          isMatriks={true}
        />
      )}
      <div className="flex justify-end mt-4 w-full">
        <PaginationComponent
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={rankingsData?.pagination.totalRecords || 0}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};

export default RankingTab;
