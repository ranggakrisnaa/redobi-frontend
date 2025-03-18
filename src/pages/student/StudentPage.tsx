import { TableComponentColumnDef } from '@/commons/types/table-component.type.ts';
import DataManagementComponent from '@/components/commons/DataManagementComponent';
import FilterComponent from '@/components/commons/FilterComponent';
import TableComponent from '@/components/commons/TableComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';

const mahasiswaData = [
  {
    id: 1,
    name: 'Aditya Putri Kusumawardani',
    nim: '12345654321',
    tahunMasuk: '2021',
    jurusan: 'RPL',
    judul:
      'PERANCANGAN ULANG UI/UX SIPLO (SISTEM INFORMASI TERPADU LAYANAN PRODI) DENGAN METODE DESIGN THINKING BERBASIS MOBILE',
    kelas: 'Karyawan',
    avatar: '/avatar.jpg',
  },
  {
    id: 2,
    name: 'Budi Santoso',
    nim: '65432112345',
    tahunMasuk: '2020',
    jurusan: 'Sistem Informasi',
    judul:
      'IMPLEMENTASI METODE MACHINE LEARNING UNTUK MEMPREDIKSI KELULUSAN MAHASISWA DI PRODI TEKNIK INFORMATIKA',
    kelas: 'Reguler',
    avatar: '/avatar.jpg',
  },
  {
    id: 3,
    name: 'Citra Dewi',
    nim: '11223344556',
    tahunMasuk: '2019',
    jurusan: 'Teknik Komputer',
    judul:
      'ANALISIS KEAMANAN DATA PADA SISTEM INFORMASI AKADEMIK MENGGUNAKAN METODE KRIPTOGRAFI',
    kelas: 'Reguler',
    avatar: '/avatar.jpg',
  },
];

const mahasiswaColumns: TableComponentColumnDef[] = [
  {
    accessorKey: 'name',
    header: 'Nama Mahasiswa',
    cell: (item) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={item.avatar} alt={item.name} />
          <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="whitespace-pre-line">{item.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'nim',
    header: 'NIM',
  },
  {
    accessorKey: 'tahunMasuk',
    header: 'Tahun Masuk',
    minWidth: '7rem',
  },
  {
    accessorKey: 'jurusan',
    header: 'Jurusan',
  },
  {
    accessorKey: 'judul',
    header: 'Judul Skripsi',
    width: 'w-1/3',
  },
  {
    accessorKey: 'kelas',
    header: 'Kelas',
  },
];

const StudentPage = () => {
  return (
    <DashboardContainer>
      <h1 className="text-2xl font-bold">Mahasiswa</h1>
      <DataManagementComponent />
      <FilterComponent />
      <TableComponent data={mahasiswaData} columns={mahasiswaColumns} />
    </DashboardContainer>
  );
};

export default StudentPage;
