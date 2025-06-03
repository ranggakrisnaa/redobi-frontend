import { filterOptions } from '@/commons/constants/student/filter-option-student.constant.ts';
import { studentColumns } from '@/commons/constants/student/table-column-data.constant.tsx';
import { IStudent } from '@/commons/interface-model/student.interface';
import { StudentFilterParams } from '@/commons/types/student/student-filter-data.type.ts';
import DataManagementComponent from '@/components/commons/DataManagementComponent';
import FilterComponent from '@/components/commons/FilterComponent';
import LoadingComponent from '@/components/commons/LoadingComponent.tsx';
import PaginationComponent from '@/components/commons/PaginationComponent.tsx';
import TableComponent from '@/components/commons/TableComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import {
  useStudentDelete,
  useStudentImportExcel,
  useStudentsPagination,
} from '@/hooks/useStudent.ts';
import { downloadExcelTemplateStudent } from '@/services/studentService';
import { useGlobalStore } from '@/store/globalStore';
import { useStudentStore } from '@/store/studentStore.ts';
import { Slash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const StudentPage = () => {
  const {
    currentPage,
    pageSize,
    setPage,
    setPageSize,
    setFilters,
    setSearch,
    setSortData,
  } = useStudentStore();
  const { data, isLoading, isError, error } = useStudentsPagination();
  const { selected } = useGlobalStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { mutateAsync: deleteMutate } = useStudentDelete();
  const { mutateAsync: importExcelMutate } = useStudentImportExcel();
  const detailRef = useRef<HTMLDivElement>(null);
  useScrollToTopOnPush(detailRef, [isLoading]);

  useEffect(() => {
    setFilters({
      tahun_masuk: searchParams.get('angkatan') || '',
      major: searchParams.get('jurusan') || '',
      class: searchParams.get('kelas') || '',
    });

    setSearch(searchParams.get('search') || '');
  }, [searchParams, setFilters, setSearch]);

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

  const formattedData =
    data?.data.map((student: IStudent) => ({
      id: student.id ?? null,
      name: student.fullName ?? '-',
      nim: student.nim ?? '-',
      tahunMasuk: student.tahunMasuk ?? '-',
      major: student.major.toString() ?? '-',
      judulSkripsi: student.judulSkripsi ?? '-',
      kelas: student.class.toString() ?? '-',
      imageUrl: student.imageUrl ?? '-',
    })) || [];

  const handleFilterChange = (filters: StudentFilterParams) => {
    setPage(1);
    setFilters({
      tahun_masuk: filters.angkatan ?? '',
      major: filters.jurusan ?? '',
      class: filters.kelas ?? '',
    });

    updateURL({
      angkatan: filters.angkatan || '',
      jurusan: filters.jurusan || '',
      kelas: filters.kelas || '',
    });
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

  const handleImportExcel = async (file: File) => {
    try {
      await importExcelMutate(file);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div>
      <DashboardContainer pageTitle="Mahasiswa">
        <BreadcrumbList>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/students')}
              className={
                currentPath == '/students'
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Mahasiswa
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
        <div>
          <DataManagementComponent
            onClickImport={handleImportExcel}
            onClickDownload={downloadExcelTemplateStudent}
            onClickDelete={handleMultipleDelete}
            onSearchChange={handleSearchChange}
            onClickCreate={() => navigate('/students/create')}
            titleDialog="Mahasiswa"
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
                columns={studentColumns}
                onSort={handleSortData}
                pathDetail="students"
                onDelete={handleSingleDelete}
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

export default StudentPage;
