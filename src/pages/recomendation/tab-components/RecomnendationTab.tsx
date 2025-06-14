import apiService from '@/api/apiService';
import { recommendationColumn } from '@/commons/constants/recommendation/table-column-data.constant';
import { TipePembimbingEnum } from '@/commons/enums/tipe-pembimbing.enum';
import DataManagementComponent from '@/components/commons/DataManagementComponent';
import PaginationComponent from '@/components/commons/PaginationComponent';
import TableComponent from '@/components/commons/TableComponent';
import {
  useCreateRecommendation,
  useDeleteRecommendation,
  usePaginationRecommendations,
} from '@/hooks/useRecommendation';
import { useGlobalStore } from '@/store/globalStore';
import { useRecommendationStore } from '@/store/recommendationStore';
import { ResponseData } from '@/utils/responseData';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecommendationDialogComponent from '../components/RecommendationDialogComponent';

type FormattedRecommendation = {
  id: string;
  studentId: string;
  studentName: string;
  lecturerFirst: string | null;
  valueFirst: number | null;
  lecturerSecond: string | null;
  valueSecond: number | null;
};

const RecommendationTab = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate: recommendationMutate } = useCreateRecommendation();
  const { data: listRecommendations } = usePaginationRecommendations();
  const { currentPage, pageSize, setPage, setPageSize, setSearch } =
    useRecommendationStore();
  const { mutateAsync: deleteMutate } = useDeleteRecommendation();
  const { selected, setSelected, setIsSearch } = useGlobalStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setPage(1);
  }, [setPage]);

  useEffect(() => {
    setIsSearch(null);
  }, [setIsSearch]);

  const formattedData: FormattedRecommendation[] = (() => {
    const recommendationMap = new Map<string, FormattedRecommendation>();

    listRecommendations?.data.forEach((recommendation) => {
      const studentId = recommendation.studentId;
      if (!studentId) return;

      if (!recommendationMap.has(studentId)) {
        recommendationMap.set(studentId, {
          id: recommendation.studentId,
          studentId: studentId,
          studentName: recommendation.student?.fullName ?? '-',
          lecturerFirst: null,
          valueFirst: null,
          lecturerSecond: null,
          valueSecond: null,
        });
      }

      const studentData = recommendationMap.get(studentId);
      if (!studentData) return;

      if (recommendation.position === TipePembimbingEnum.PEMBIMBING_SATU) {
        studentData.lecturerFirst = recommendation.lecturer?.fullName ?? '-';
        studentData.valueFirst = recommendation.recommendationScore ?? null;
      }

      if (recommendation.position === TipePembimbingEnum.PEMBIMBING_DUA) {
        studentData.lecturerSecond = recommendation.lecturer?.fullName ?? '-';
        studentData.valueSecond = recommendation.recommendationScore ?? null;
      }
    });

    return Array.from(recommendationMap.values());
  })();

  const handleExportPDF = async () => {
    const response = await apiService.get<
      ResponseData<{ supabaseUrl: string }>
    >('/recommendations/pdf');

    const pdfUrl = response.data.data.supabaseUrl;

    window.open(pdfUrl, '_blank');
  };

  const handleDeleteRecommendation = async () => {
    try {
      await deleteMutate(selected as unknown as string[]);
      setSelected([]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
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

  return (
    <div>
      <DataManagementComponent
        onClickCreate={() => {
          if (listRecommendations?.data.length == 0) {
            recommendationMutate();
          } else {
            setPage(1);
            setPageSize(99999);
          }
          setDialogOpen(true);
        }}
        isRecommendation={true}
        excludeImportExport={true}
        onClickDelete={handleDeleteRecommendation}
        onSearchChange={handleSearchChange}
        onCreatePDF={handleExportPDF}
        titleDialog="Normalisasi Matriks"
        isMatriks={true}
      />
      <TableComponent
        data={formattedData}
        columns={recommendationColumn}
        isMatriks={true}
      />
      <div className="flex justify-end mt-4 w-full">
        <PaginationComponent
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={listRecommendations?.pagination.totalRecords || 0}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
      <RecommendationDialogComponent
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </div>
  );
};

export default RecommendationTab;
