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
import { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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
    setSearch,
    setSortData,
  } = useAssessmentStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const { selected } = useGlobalStore();
  const { mutateAsync: deleteMutate } = useAssessmentDelete();
  const detailRef = useRef<HTMLDivElement>(null);
  useScrollToTopOnPush(detailRef, [isLoading]);

  const formattedData = useMemo(() => {
    if (!data?.data) return [];

    const lecturerGroups: Record<
      string,
      {
        id: string;
        lecturerName: string;
        allSubCriteria: any[];
      }
    > = {};

    data.data.forEach((assessment: IAssessment) => {
      const lecturerName = assessment.lecturer.fullName;
      if (!lecturerGroups[lecturerName]) {
        lecturerGroups[lecturerName] = {
          id: assessment.id,
          lecturerName: lecturerName,
          allSubCriteria: [],
        };
      }
      const subCriteriaData = assessment.assessmentSubCriteria ?? [];
      lecturerGroups[lecturerName].allSubCriteria.push(...subCriteriaData);
    });

    const result: Array<{
      id: string;
      lecturerName: string | null;
      criteriaName: string | null;
      subCriteriaName: string | number;
      subCriteriaScore: string | number;
      isNewLecturer: boolean;
      isNewCriteria: boolean;
    }> = [];

    Object.values(lecturerGroups).forEach((lecturer) => {
      const criteriaGroups: Record<
        string,
        Array<{
          subName: string | number;
          score: string | number;
        }>
      > = {};

      lecturer.allSubCriteria.forEach((assSub) => {
        const criteriaName = assSub.subCriteria?.criteria?.name || '-';
        const subName = assSub.subCriteria?.name || '-';
        const score = assSub.score ?? '-';

        if (!criteriaGroups[criteriaName]) {
          criteriaGroups[criteriaName] = [];
        }
        criteriaGroups[criteriaName].push({ subName, score });
      });

      let isFirstRowForLecturer = true;
      Object.entries(criteriaGroups).forEach(([criteriaName, subItems]) => {
        let isFirstRowForCriteria = true;
        subItems.forEach((item) => {
          result.push({
            id: lecturer.id,
            lecturerName: isFirstRowForLecturer ? lecturer.lecturerName : null,
            criteriaName: isFirstRowForCriteria ? criteriaName : null,
            subCriteriaName: item.subName,
            subCriteriaScore: item.score,
            isNewLecturer: isFirstRowForLecturer,
            isNewCriteria: isFirstRowForCriteria && !isFirstRowForLecturer,
          });
          isFirstRowForLecturer = false;
          isFirstRowForCriteria = false;
        });
      });
    });

    return result.map((row, index) => ({
      id: index == 0 ? row.id : `${row.id}-${index}`,
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
      subCriteriaName: [
        <span key={`sub-${index}`} className="block">
          {row.subCriteriaName}
        </span>,
      ],
      subCriteriaScores: [
        <span key={`score-${index}`} className="block">
          {row.subCriteriaScore}
        </span>,
      ],
      showOneRowActions: true,
      isNewLecturer: row.isNewLecturer,
      isNewCriteria: row.isNewCriteria,
      assessmentTable: true,
    }));
  }, [data?.data]);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams, setSearch]);

  const updateURL = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        newParams.set(key, params[key]);
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams, { replace: true });
  };

  const handleMultipleDelete = async () => {
    try {
      await deleteMutate(selected as unknown as string[]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSortData = (sort: string) => {
    setPage(1);
    setSortData(sort);
  };

  const handleSearchChange = (search: string) => {
    setPage(1);
    setSearch(search);
    updateURL({ search });
  };

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
      <DashboardContainer pageTitle="Penilaian Dosen">
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
