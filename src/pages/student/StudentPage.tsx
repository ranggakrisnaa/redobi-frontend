import { filterOptions } from '@/commons/constants/filter-option-student.constant.ts';
import { TableComponentColumnDef } from '@/commons/types/table-component.type.ts';
import DataManagementComponent from '@/components/commons/DataManagementComponent';
import FilterComponent from '@/components/commons/FilterComponent';
import LoadingComponent from '@/components/commons/LoadingComponent.tsx';
import PaginationComponent from '@/components/commons/PaginationComponent.tsx';
import TableComponent from '@/components/commons/TableComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { useStudents } from '@/hooks/useStudent.ts';
import { useStudentStore } from '@/store/studentStore.ts';

const StudentPage = () => {
  const { currentPage, pageSize, setPage, setPageSize, setFilters } =
    useStudentStore();
  const { data, isLoading, isError, error } = useStudents();

  const mahasiswaColumns: TableComponentColumnDef[] = [
    {
      accessorKey: 'name',
      header: 'Nama Mahasiswa',
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={item.imageUrl ?? null} alt={item.name} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <span className="whitespace-pre-line">{item.name}</span>
        </div>
      ),
      width: 'w-[283px]',
    },
    { accessorKey: 'nim', header: 'NIM', width: 'w-[120px]' },
    { accessorKey: 'tahunMasuk', header: 'Angkatan', width: 'w-[100px]' },
    { accessorKey: 'major', header: 'Jurusan', width: 'w-[106px]' },
    { accessorKey: 'kelas', header: 'Kelas', width: 'w-[115px]' },
    { accessorKey: 'judulSkripsi', header: 'Judul Skripsi', width: 'w-1/3' },
  ];

  const formattedData =
    data?.data.map((student) => ({
      id: student.id,
      name: student.fullName,
      nim: student.nim,
      tahunMasuk: student.tahunMasuk,
      major: student.major.toString(),
      judulSkripsi: student.judulSkripsi,
      kelas: student.class.toString(),
      imageUrl: student.imageUrl,
    })) || [];

  const handleFilterChange = (filters: any) => {
    setFilters({
      tahun_masuk: filters.angkatan || null,
      major: filters.jurusan || null,
      class: filters.kelas || null,
    });
  };

  return (
    <DashboardContainer>
      <h1 className="text-2xl font-bold">Data Mahasiswa</h1>
      <DataManagementComponent />
      <FilterComponent
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
      />
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <LoadingComponent />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500 mt-3">{error.message}</p>
      ) : (
        <>
          <TableComponent data={formattedData} columns={mahasiswaColumns} />
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
    </DashboardContainer>
  );
};

export default StudentPage;
