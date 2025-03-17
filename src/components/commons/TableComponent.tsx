import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const mahasiswaData = [
  {
    id: 1,
    name: 'Aditya Putri Kusumawardani adadwwadadkawndkwna',
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

const TableComponent = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const isAllSelected = selected.length === mahasiswaData.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(mahasiswaData.map((m) => m.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="rounded-lg mt-10 overflow-hidden border-b-4">
      <div className="relative max-h-96 overflow-y-auto">
        <Table className="w-full min-w-[1000px] border-0">
          <TableHeader className="bg-gray-100 text-gray-700 sticky top-0 z-10 shadow-none">
            <TableRow className="">
              <TableHead className="min-w-[40px] text-center">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                  className="size-4"
                />
              </TableHead>
              <TableHead className="font-bold text-black">
                Nama Mahasiswa
              </TableHead>
              <TableHead className="font-bold text-black">NIM</TableHead>
              <TableHead className="min-w-28 font-bold text-black">
                Tahun Masuk
              </TableHead>
              <TableHead className="font-bold text-black">Jurusan</TableHead>
              <TableHead className="font-bold text-black">
                Judul Skripsi
              </TableHead>
              <TableHead className="font-bold text-black">Kelas</TableHead>
              <TableHead className="w-32 text-center font-bold text-black">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {mahasiswaData.map((mahasiswa) => (
              <TableRow
                key={mahasiswa.id}
                className="border-b hover:bg-gray-50"
              >
                <TableCell className="text-center">
                  <Checkbox
                    checked={selected.includes(mahasiswa.id)}
                    onCheckedChange={() => toggleSelect(mahasiswa.id)}
                    className="size-4"
                  />
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={mahasiswa.avatar}
                        alt={mahasiswa.name}
                      />
                      <AvatarFallback>
                        {mahasiswa.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="whitespace-pre-line">
                      {mahasiswa.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {mahasiswa.nim}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {mahasiswa.tahunMasuk}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {mahasiswa.jurusan}
                </TableCell>
                <TableCell className="w-1/3">{mahasiswa.judul}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {mahasiswa.kelas}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center gap-2">
                    <button className=" text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>
                    <button className=" text-yellow-600 hover:text-yellow-800">
                      <Pencil size={18} />
                    </button>
                    <button className=" text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableComponent;
