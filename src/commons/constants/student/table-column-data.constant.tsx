import { TableComponentColumnDef } from '@/commons/types/table-component.type.ts';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { useStudentStore } from '@/store/studentStore.ts';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

export const studentColumns: TableComponentColumnDef[] = [
  {
    accessorKey: 'name',
    header: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { sortBy, sortOrder, setSortData } = useStudentStore();
      const isActive = sortBy === 'full_name';

      return (
        <div
          onClick={() => setSortData('full_name')}
          className="flex gap-[5px] items-center justify-between cursor-pointer pl-4 border-l border-gray-300"
        >
          <span>Nama Mahasiswa</span>
          {isActive ? (
            sortOrder === 'desc' ? (
              <ArrowDownAZ size={16} className="text-[#9CA3AF]" />
            ) : (
              <ArrowUpAZ size={16} className="text-[#9CA3AF]" />
            )
          ) : (
            <ArrowUpAZ size={16} className="text-[#9CA3AF]" />
          )}
        </div>
      );
    },
    cell: (item) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={item.imageUrl} alt={item.name} />
          <AvatarFallback />
        </Avatar>
        <span className="whitespace-pre-line">{item.name}</span>
      </div>
    ),
    width: 'min-w-[220px]',
  },
  {
    accessorKey: 'nim',
    header: () => <div className="border-l pl-4 border-gray-300">NIM</div>,
    width: 'w-[120px]',
  },
  {
    accessorKey: 'tahunMasuk',
    header: () => <div className="border-l pl-4 border-gray-300">Angkatan</div>,
    width: 'w-[100px]',
  },
  {
    accessorKey: 'major',
    header: () => <div className="border-l pl-4 border-gray-300">Jurusan</div>,
    width: 'w-[106px]',
  },
  {
    accessorKey: 'kelas',
    header: () => <div className="border-l pl-4 border-gray-300">Kelas</div>,
    width: 'w-[115px]',
  },
  {
    accessorKey: 'judulSkripsi',
    header: () => (
      <div className="border-l border-r pl-4 border-gray-300">
        Judul Skripsi
      </div>
    ),
    width: 'w-1/3',
  },
];
