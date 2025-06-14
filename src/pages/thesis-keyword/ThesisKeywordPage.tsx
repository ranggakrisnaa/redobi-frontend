import { filterOptions } from '@/commons/constants/thesis-keyword/filter-option-thesis-keyword.constant';
import { thesisKeywordColumn } from '@/commons/constants/thesis-keyword/table-column-data.constant';
import { IKeyword } from '@/commons/interface-model/keyword-entity.interface';
import { IThesisKeyword } from '@/commons/interface-model/thesis-keyword-entity.interface';
import { ThesisKeywordFilterParams } from '@/commons/types/thesis-keyword/thesis-keyword-filter-data.type';
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
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import {
  useThesisKeywordDelete,
  useThesisKeywordPagination,
} from '@/hooks/useThesisKeyword';
import { useGlobalStore } from '@/store/globalStore';
import { useThesisKeywordStore } from '@/store/thesisKeywordStore';
import { Slash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const ThesisKeywordPage = () => {
  const {
    currentPage,
    pageSize,
    setPage,
    setPageSize,
    setFilters,
    setSearch,
    setSortData,
  } = useThesisKeywordStore();
  const { data, isLoading, isError, error } = useThesisKeywordPagination();
  const navigate = useNavigate();
  const location = useLocation();
  const { selected, setIsSearch } = useGlobalStore();
  const { mutateAsync: deleteMutate } = useThesisKeywordDelete();
  const currentPath = location.pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const detailRef = useRef<HTMLDivElement>(null);
  useScrollToTopOnPush(detailRef, [isLoading]);

  useEffect(() => {
    setIsSearch(null);
  }, [setIsSearch]);

  const formattedThesisKeywordData =
    data?.data?.map((item: IThesisKeyword) => {
      const keywordList = item.keyword ?? [];

      const keywordElements: JSX.Element[] = [];

      keywordList.forEach((k: IKeyword, index: number) => {
        keywordElements.push(
          <span key={`keyword-${index}`} className="block mb-2">
            {k.name}
          </span>,
        );
      });

      return {
        id: item.id ?? null,
        category: item.category ?? '-',
        keywords: keywordElements.length > 0 ? keywordElements : '-',
        createdAt: item.createdAt
          ? new Date(item.createdAt).toLocaleString()
          : '-',
      };
    }) || [];

  const handleMultipleDelete = async () => {
    try {
      await deleteMutate(selected as unknown as number[]);
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

  const handleSortData = (sort: string) => {
    setPage(1);
    setSortData(sort);
  };

  const handleSearchChange = (search: string) => {
    setPage(1);
    setSearch(search);
    updateURL({ search });
  };

  const handleSingleDelete = async (id: number) => {
    try {
      await deleteMutate([id]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleFilterData = (data: ThesisKeywordFilterParams) => {
    setPage(1);
    setFilters({ category: data.kategori as string });
    updateURL({ category: data.kategori as string });
  };

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="Judul Skripsi">
        <BreadcrumbList>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/thesis-keywords')}
              className={
                currentPath == '/thesis-keywords'
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Judul Skripsi
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
        <div>
          <DataManagementComponent
            onClickCreate={() => navigate('/thesis-keywords/create')}
            onClickDelete={handleMultipleDelete}
            onSearchChange={handleSearchChange}
            excludeImportExport={true}
            titleDialog="Judul Skripsi"
          />
          <FilterComponent
            filterOptions={filterOptions}
            onFilterChange={handleFilterData}
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
                data={formattedThesisKeywordData}
                columns={thesisKeywordColumn}
                pathDetail="thesis-keywords"
                onDelete={handleSingleDelete}
                onSort={handleSortData}
                isDetail={false}
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

export default ThesisKeywordPage;
