import { filterOptions } from '@/commons/constants/criteria/filter-option-criteria.constant';
import { criteriaColumns } from '@/commons/constants/criteria/table-column-data.constant';
import { ISubCriteria } from '@/commons/interface-model/sub-criteria-entity.entity';
import { CriteriaFilterParams } from '@/commons/types/criteria/criteria-filter-data.type';
import DataManagementComponent from '@/components/commons/DataManagementComponent';
import FilterComponent from '@/components/commons/FilterComponent';
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
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { useCriteriaStore } from '@/store/criteriaStore';
import { useGlobalStore } from '@/store/globalStore';
import { Slash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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
    setFilters,
    setSearch,
    setSortData,
  } = useCriteriaStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutateAsync: deleteMutate } = useCriteriaDelete();
  const { selected, setIsSearch, setSelected } = useGlobalStore();
  const detailRef = useRef<HTMLDivElement>(null);
  useScrollToTopOnPush(detailRef, [isLoading]);

  useEffect(() => {
    setIsSearch(null);
  }, [setIsSearch]);

  const formattedData =
    data?.data?.map((criteria) => {
      const subCriteriaList = criteria.subCriteria ?? [];

      const subKriteriaElements: JSX.Element[] = [];
      const subCriteriaWeightElements: JSX.Element[] = [];

      subCriteriaList.forEach((sub: ISubCriteria, index: number) => {
        subKriteriaElements.push(
          <span key={`name-${index}`} className="block mb-2">
            {sub.name}
          </span>,
        );
        subCriteriaWeightElements.push(
          <span key={`weight-${index}`} className="block mb-2">
            {parseFloat(sub.weight.toString())}
          </span>,
        );
      });

      return {
        id: criteria.id ?? null,
        name: criteria.name ?? '-',
        type: criteria.type ?? '-',
        subKriteria: subKriteriaElements.length > 0 ? subKriteriaElements : '-',
      };
    }) || [];

  const handleMultipleDelete = async () => {
    try {
      await deleteMutate(selected as unknown as number[]);
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

  const handleSortData = (sort: string) => {
    setPage(1);
    setSortData(sort);
  };

  const handleFilterChange = (type: CriteriaFilterParams) => {
    setPage(1);
    setFilters({ type: type.tipeKriteria || '' });
    updateURL({ type: type.tipeKriteria || '' });
  };

  const handleSingleDelete = async (id: number) => {
    try {
      await deleteMutate([id]);
      setSelected([]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="Kriteria dan Sub-Kriteria">
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
        <div>
          <DataManagementComponent
            onClickCreate={() => navigate('/criteria/create')}
            onClickDelete={handleMultipleDelete}
            onSearchChange={handleSearchChange}
            titleDialog="Criteria"
            excludeImportExport={true}
          />
          <FilterComponent
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
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
                pathDetail="criteria"
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
