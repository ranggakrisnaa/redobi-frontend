import { criteriaColumns } from '@/commons/constants/criteria/table-column-data.constant';
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
import { useCriteriaDelete, useCriteriaPagination } from '@/hooks/useCriteria';
import { useCriteriaStore } from '@/store/criteriaStore';
import { useGlobalStore } from '@/store/globalStore';
import { Slash } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const CriteriaPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { data, isLoading, isError, error } = useCriteriaPagination();
  const {
    currentPage,
    pageSize,
    setPage,
    setPageSize,
    // setFilters,
    // setSearch,
    // setSortData,
  } = useCriteriaStore();
  const { mutateAsync: deleteMutate } = useCriteriaDelete();
  const { selected } = useGlobalStore();

  const formattedData =
    data?.data?.map((criteria) => ({
      id: criteria.id || '',
      name: criteria.name,
      type: criteria.type,
      criteriaWeight: criteria.weight,
      subKriteria: criteria.subCriteria?.map((sub, index) => (
        <span key={index} className="block mb-2">
          {sub.name}
        </span>
      )),
      subCriteriaWeight: criteria.subCriteria?.map((sub, index) => (
        <span key={index} className="block mb-2">
          {parseFloat(sub.weight.toString())}
        </span>
      )),
    })) || [];

  const handleMultipleDelete = async () => {
    try {
      await deleteMutate(selected as unknown as number[]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSearchChange = () => {};

  const handleSortData = () => {};

  const handleSingleDelete = async (id: number) => {
    try {
      await deleteMutate([id]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div>
      <DashboardContainer pageTitle="Data Kriteria dan Sub-Kriteria">
        <div>
          <BreadcrumbList>
            <BreadcrumbList>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => navigate('/criteria')}
                  className={
                    currentPath == '/criteria'
                      ? 'text-black font-medium hover:cursor-pointer'
                      : 'hover:cursor-pointer'
                  }
                >
                  Kriteria & Sub-Kriteria
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </BreadcrumbList>
        </div>
        <div>
          <DataManagementComponent
            onClickCreate={() => navigate('/criteria/create')}
            onClickDelete={handleMultipleDelete}
            onSearchChange={handleSearchChange}
            titleDialog="Criteria"
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
                columns={criteriaColumns}
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

export default CriteriaPage;
