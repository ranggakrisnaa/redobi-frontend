import { TableComponentColumnDef } from '@/commons/types/table-component.type';
import { useThesisKeywordStore } from '@/store/thesisKeywordStore';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

export const thesisKeywordColumn: TableComponentColumnDef[] = [
  {
    accessorKey: 'category',
    header: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { sortBy, sortOrder, setSortData } = useThesisKeywordStore();
      const isActive = sortBy === 'category';
      return (
        <div
          className="flex gap-[5px] items-center justify-between cursor-pointer pl-4 border-l border-gray-300"
          onClick={() => setSortData('category')}
        >
          Kategori Judul Skripsi
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
    width: 'w-[800px]',
  },
  {
    accessorKey: 'keywords',
    header: () => <div className="border-x pl-4 border-gray-300">Keyword</div>,
    width: 'w-[800px]',
  },
];
