import { assessmentColumn } from '@/commons/constants/assessment/table-column-data.constant';
import { IAssessment } from '@/commons/interface-model/assessment-entity.interface';
import DataManagementComponent from '@/components/commons/DataManagementComponent';
import LoadingComponent from '@/components/commons/LoadingComponent';
import PaginationComponent from '@/components/commons/PaginationComponent';
import TableComponent from '@/components/commons/TableComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  useAssessmentDelete,
  useAssessmentPagination,
} from '@/hooks/useAssessment';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { useAssessmentStore } from '@/store/assessmentStore';
import { useGlobalStore } from '@/store/globalStore';
import { Slash } from 'lucide-react';
import { useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AssessmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { data, isLoading, isError, error } = useAssessmentPagination();
  const {
    currentPage,
    pageSize,
    setPage,
    setPageSize,
    // setSearch,
    // setSortData,
  } = useAssessmentStore();
  const { selected } = useGlobalStore();
  const { mutateAsync: deleteMutate } = useAssessmentDelete();
  const detailRef = useRef<HTMLDivElement>(null);
  useScrollToTopOnPush(detailRef, [isLoading]);

  const formattedData = useMemo(() => {
    if (!data?.data) return [];

    const lecturerMap = new Map<
      string,
      {
        id: string;
        lecturerName: string;
        criteriaName: Set<string>;
        subCriteriaName: (string | number)[];
        subCriteriaScores: (string | number)[];
      }
    >();

    data.data.forEach((assessment: IAssessment) => {
      const lecturerName = assessment.lecturer.fullName;

      if (!lecturerMap.has(lecturerName)) {
        lecturerMap.set(lecturerName, {
          id: assessment.id,
          lecturerName,
          criteriaName: new Set<string>(),
          subCriteriaName: [],
          subCriteriaScores: [],
        });
      }

      const currentLecturer = lecturerMap.get(lecturerName);
      const subCriteriaData = assessment.assessmentSubCriteria ?? [];

      subCriteriaData.forEach((assSub) => {
        const criteriaName = assSub.subCriteria?.criteria?.name || '-';
        const subName = assSub.subCriteria?.name || '-';
        const score = assSub.score ?? '-';

        currentLecturer?.criteriaName.add(criteriaName);
        currentLecturer?.subCriteriaName.push(subName);
        currentLecturer?.subCriteriaScores.push(score);
      });
    });

    return Array.from(lecturerMap.values()).map((lecturer) => ({
      ...lecturer,
      criteriaName: Array.from(lecturer.criteriaName).map((name, index) => (
        <span key={`criteria-${index}`} className="block mb-2">
          {name}
        </span>
      )),
      subCriteriaName: Array.from(lecturer.subCriteriaName).map(
        (name, index) => (
          <span key={`sub-${index}`} className="block mb-2">
            {name}
          </span>
        ),
      ),
      subCriteriaScores: Array.from(lecturer.subCriteriaScores).map(
        (score, index) => (
          <span key={`sub-${index}`} className="block mb-2">
            {score}
          </span>
        ),
      ),
    }));
  }, [data?.data]);

  const handleMultipleDelete = async () => {
    try {
      await deleteMutate(selected as unknown as string[]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSortData = () => {};

  const handleSearchChange = () => {};

  const handleSingleDelete = async (id: string) => {
    try {
      await deleteMutate([id]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="Data Penilaian Dosen">
        <BreadcrumbList>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/assessments')}
              className={
                currentPath == '/assessments'
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Penilaian Dosen
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
        <div>
          <DataManagementComponent
            onClickDelete={handleMultipleDelete}
            onSearchChange={handleSearchChange}
            onClickCreate={() => navigate('/assessments/create')}
            titleDialog="Penilaian Dosen"
            excludeImportExport={true}
          />
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingComponent />
            </div>
          ) : isError ? (
            <p className="text-center text-red-500 mt-3">{error.message}</p>
          ) : (
            <>
              <TableComponent
                data={formattedData}
                columns={assessmentColumn}
                pathDetail="assessments"
                onDelete={handleSingleDelete}
                onSort={handleSortData}
              />
              <div className="flex justify-end mt-4 w-full">
                <PaginationComponent
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalItems={data?.pagination.totalRecords || 0}
                  onPageChange={setPage}
                  onPageSizeChange={setPageSize}
                />
              </div>
            </>
          )}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AssessmentPage;
