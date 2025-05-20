import { filterOptions } from '@/commons/constants/lecturer/filter-option-lecturer.constant';
import { lecturerColumns } from '@/commons/constants/lecturer/table-column-data.constant';
import { ILecturer } from '@/commons/interface-model/lecturer-entity.interface';
import { LecturerFilterParams } from '@/commons/types/lecturer/lecturer-filter-data.type';
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
import {
  useLecturerDelete,
  useLecturerImportExcel,
  useLecturerPagination,
} from '@/hooks/useLecturer';
import { downloadExcelTemplateLecturer } from '@/services/lecturerService';
import { useGlobalStore } from '@/store/globalStore';
import { useLecturerStore } from '@/store/lecturerStore';
import { Slash } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const LecturerPage = () => {
  const {
    currentPage,
    pageSize,
    setPage,
    setPageSize,
    setFilters,
    setSearch,
    setSortData,
  } = useLecturerStore();
  const { data, isLoading, isError, error } = useLecturerPagination();
  const { mutateAsync: importExcelMutate } = useLecturerImportExcel();
  const { mutateAsync: deleteMutate } = useLecturerDelete();
  const location = useLocation();
  const { selected } = useGlobalStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const formattedData =
    data?.data.map((lecturer: ILecturer) => ({
      id: lecturer.id ?? null,
      nidn: lecturer.nidn ?? '-',
      name: lecturer.fullName ?? '-',
      jumlahBimbingan: lecturer.jumlahBimbingan ?? '-',
      kuotaBimbingan: lecturer.kuotaBimbingan ?? '-',
      tipePembimbing: lecturer.tipePembimbing ?? '-',
      prodi: lecturer.prodi ?? '-',
      imageUrl: lecturer.imageUrl ?? '-',
    })) || [];

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

  const handleSearcChange = (search: string) => {
    setPage(1);
    setSearch(search);
    updateURL({ search });
  };

  const handleImportExcel = async (file: File) => {
    try {
      await importExcelMutate(file);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
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

  const handleSingleDelete = async (id: string) => {
    try {
      await deleteMutate([id]);
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

  const handleFilterChange = (filters: LecturerFilterParams) => {
    setPage(1);
    setFilters({
      prodi: filters.prodi || '',
      tipe_pembimbing: filters.tipePembimbing || '',
    });

    updateURL({
      prodi: filters.prodi || '',
      tipePembimbing: filters.tipePembimbing || '',
    });
  };

  return (
    <DashboardContainer pageTitle="Data Dosen Pembimbing">
      <div>
        <BreadcrumbList>
          <BreadcrumbList>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate('/lecturers')}
                className={
                  currentPath == '/lecturers'
                    ? 'text-black font-medium hover:cursor-pointer'
                    : ''
                }
              >
                Dosen Pembimbing
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbList>
      </div>
      <div>
        <DataManagementComponent
          onClickCreate={() => navigate('/lecturers/create')}
          onClickDelete={handleMultipleDelete}
          onClickImport={handleImportExcel}
          onSearchChange={handleSearcChange}
          onClickDownload={downloadExcelTemplateLecturer}
          titleDialog="Dosen Pembimbing"
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
              columns={lecturerColumns}
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
  );
};
export default LecturerPage;
