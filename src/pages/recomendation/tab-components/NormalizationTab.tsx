import { normalizationColumn } from '@/commons/constants/recommendation/table-column-data.constant';
import { INormalizedMatrices } from '@/commons/interface-model/normalized-matrices-entity.interface';
import DataManagementComponent from '@/components/commons/DataManagementComponent';
import PaginationComponent from '@/components/commons/PaginationComponent';
import TableComponent from '@/components/commons/TableComponent';
import {
  useCreateNormalization,
  useCreateRankingMatrices,
  useDeleteNormalization,
  usePaginationNormalization,
} from '@/hooks/useRecommendation';
import { useGlobalStore } from '@/store/globalStore';
import { useRecommendationStore } from '@/store/recommendationStore';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const NormalizationTab = () => {
  const { mutate: normalizationMutate } = useCreateNormalization();
  const { mutate: rankingMutate } = useCreateRankingMatrices();
  const { selected, setSelected, setIsSearch } = useGlobalStore();
  const { data: normalizationsData } = usePaginationNormalization();
  const { mutateAsync: deleteMutate } = useDeleteNormalization();
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

  const formattedData = useMemo(() => {
    if (!normalizationsData?.data) return [];

    const lecturerGroups: Record<
      string,
      {
        id: string;
        lecturerName: string;
        allCriteria: INormalizedMatrices[];
      }
    > = {};

    normalizationsData.data.forEach((item) => {
      const lecturerId = item.lecturerId;
      if (!lecturerGroups[lecturerId]) {
        lecturerGroups[lecturerId] = {
          id: item.id,
          lecturerName: item.lecturer?.fullName || '-',
          allCriteria: [],
        };
      }
      lecturerGroups[lecturerId].allCriteria.push(item);
    });

    const result: Array<{
      id: string;
      lecturerName: string | null;
      criteriaName: string | null;
      normalizedValue: string | number;
      isNewLecturer: boolean;
      isNewCriteria: boolean;
    }> = [];

    Object.values(lecturerGroups).forEach((lecturer) => {
      const criteriaGroups: Record<string, INormalizedMatrices[]> = {};

      lecturer.allCriteria.forEach((item) => {
        const criteriaName = item.criteria?.name || '-';
        if (!criteriaGroups[criteriaName]) {
          criteriaGroups[criteriaName] = [];
        }
        criteriaGroups[criteriaName].push(item);
      });

      let isFirstLecturerRow = true;
      Object.entries(criteriaGroups).forEach(([criteriaName, items]) => {
        let isFirstCriteriaRow = true;
        items.forEach((item) => {
          result.push({
            id: item.lecturerId,
            lecturerName: isFirstLecturerRow ? lecturer.lecturerName : null,
            criteriaName: isFirstCriteriaRow ? criteriaName : null,
            normalizedValue: item.normalizedValue,
            isNewLecturer: isFirstLecturerRow,
            isNewCriteria: isFirstCriteriaRow && !isFirstLecturerRow,
          });
          isFirstLecturerRow = false;
          isFirstCriteriaRow = false;
        });
      });
    });

    return result.map((row, index) => ({
      id: `${row.id}-${index}`,
      assessmentId: row.id,
      lecturerName: row.lecturerName
        ? [
            <span key={`lecturer-${index}`} className="block">
              {row.lecturerName}
            </span>,
          ]
        : [<span key={`lecturer-empty-${index}`}></span>],
      criteriaName: row.criteriaName
        ? [
            <span key={`criteria-${index}`} className="block">
              {row.criteriaName}
            </span>,
          ]
        : [<span key={`criteria-empty-${index}`}></span>],
      normalizedValue: [
        <span key={`value-${index}`} className="block">
          {row.normalizedValue}
        </span>,
      ],
      assessmentTable: true,
      showOneRowActions: true,
      isNewLecturer: row.isNewLecturer,
      isNewCriteria: row.isNewCriteria,
    }));
  }, [normalizationsData?.data]);

  const handleCreateNormalization = () => {
    normalizationMutate();
  };

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

  const handleSearchChange = (search: string) => {
    setPage(1);
    setSearch(search);
    updateURL({ search });
  };

  const handleDeleteNormalization = async (): Promise<boolean> => {
    try {
      await deleteMutate(selected as string[]);
      setSelected([]);
      return true;
    } catch (error) {
      console.error('Failed to delete normalization items:', error);
      return false;
    }
  };

  return (
    <div>
      <DataManagementComponent
        onClickCreate={handleCreateNormalization}
        excludeImportExport={true}
        onClickDelete={handleDeleteNormalization}
        onSearchChange={handleSearchChange}
        titleDialog="Nomalisasi Matriks"
        isMatriks={true}
      />
      <TableComponent
        data={formattedData}
        columns={normalizationColumn}
        isMatriks={true}
      />
      <div className="flex justify-end mt-4 w-full">
        <PaginationComponent
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={normalizationsData?.pagination.totalRecords || 0}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};

export default NormalizationTab;
