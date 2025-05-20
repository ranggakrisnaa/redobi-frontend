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
import { useAssessmentPagination } from '@/hooks/useAssessment';
import { useAssessmentStore } from '@/store/assessmentStore';
import { Slash } from 'lucide-react';
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
  const formattedData =
    data?.data.map((assessment: IAssessment) => {
      const subCriteriaData = assessment.assessmentSubCriteria ?? [];

      const criteriaNames: JSX.Element[] = [];
      const subCriteriaNames: JSX.Element[] = [];
      const subCriteriaScores: JSX.Element[] = [];

      subCriteriaData.forEach((assSub, index) => {
        criteriaNames.push(
          <span key={`name-${index}`} className="block mb-2">
            {assSub.subCriteria.criteria?.name}
          </span>,
        );
        subCriteriaNames.push(
          <span key={`name-${index}`} className="block mb-2">
            {assSub.subCriteria.name}
          </span>,
        );
        subCriteriaScores.push(
          <span key={`name-${index}`} className="block mb-2">
            {assSub.score}
          </span>,
        );
      });

      return {
        id: assessment.id,
        lecturerName: assessment.lecturer.fullName,
        criteriaName: criteriaNames ?? null,
        subCriteriaName: subCriteriaNames ?? null,
        subCriteriaScores: subCriteriaScores ?? null,
      };
    }) || [];

  const handleMultipleDelete = async () => {
    return true;
  };

  const handleSortData = () => {};

  const handleSearchChange = () => {};
  const handleSingleDelete = async () => {
    return true;
  };

  return (
    <div>
      <DashboardContainer pageTitle="Data Penilaian Dosen">
        <div>
          <BreadcrumbList>
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
          </BreadcrumbList>
        </div>
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
                pathDetail="lecturers"
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
