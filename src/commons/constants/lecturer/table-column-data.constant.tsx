import { TableComponentColumnDef } from '@/commons/types/table-component.type.ts';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { useLecturerStore } from '@/store/lecturerStore';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

export const lecturerColumns: TableComponentColumnDef[] = [
  {
    accessorKey: 'name',
    header: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { sortBy, sortOrder, setSortData } = useLecturerStore();
      const isActive = sortBy === 'full_name';

      return (
        <div
          onClick={() => setSortData('full_name')}
          className="flex gap-[5px] items-center justify-between cursor-pointer pl-4 border-l border-gray-300"
        >
          <span>Nama Dosen</span>
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
    accessorKey: 'nidn',
    header: () => <div className="border-l pl-4 border-gray-300">NIDN</div>,
    width: 'w-[120px]',
  },
  {
    accessorKey: 'prodi',
    header: () => <div className="border-l pl-4 border-gray-300">Prodi</div>,
    width: 'w-[100px]',
  },
  {
    accessorKey: 'tipePembimbing',
    header: () => (
      <div className="border-l pl-4 border-gray-300">Tipe Pembimbing</div>
    ),
    width: 'w-[180px]',
  },
  {
    accessorKey: 'kuotaBimbingan',
    header: () => (
      <div className="border-l pl-4 border-gray-300">Kuota Bimbingan</div>
    ),
  },
  {
    accessorKey: 'jumlahBimbingan',
    header: () => (
      <div className="border-l border-r pl-4 border-gray-300">
        Jumlah Bimbingan
      </div>
    ),
  },
];
