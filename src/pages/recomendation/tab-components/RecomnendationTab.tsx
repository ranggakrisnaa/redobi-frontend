import { recommendationColumn } from '@/commons/constants/recommendation/table-column-data.constant';
import { TipePembimbingEnum } from '@/commons/enums/tipe-pembimbing.enum';
import DataManagementComponent from '@/components/commons/DataManagementComponent';
import PaginationComponent from '@/components/commons/PaginationComponent';
import TableComponent from '@/components/commons/TableComponent';
import {
  useCreateRecommendation,
  usePaginationRecommendations,
} from '@/hooks/useRecommendation';
import { useRecommendationStore } from '@/store/recommendationStore';
import { useEffect, useState } from 'react';
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
  const { currentPage, pageSize, setPage, setPageSize } =
    useRecommendationStore();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (listRecommendations?.data) {
      setTotal(listRecommendations.data.length);
    }
  }, [listRecommendations?.data]);

  const formattedData: FormattedRecommendation[] = (() => {
    const recommendationMap = new Map<string, FormattedRecommendation>();

    listRecommendations?.data.forEach((recommendation) => {
      const studentId = recommendation.studentId;
      if (!studentId) return;

      if (!recommendationMap.has(studentId)) {
        recommendationMap.set(studentId, {
          id: recommendation.id,
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

  return (
    <div>
      <DataManagementComponent
        onClickCreate={() => {
          setPageSize(total);
          if (listRecommendations?.data.length == 0) {
            recommendationMutate();
          }
          setDialogOpen(true);
        }}
        isRecommendation={true}
        excludeImportExport={true}
        onClickDelete={async () => true}
        onSearchChange={() => {}}
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
