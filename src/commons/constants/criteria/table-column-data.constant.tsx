import { TableComponentColumnDef } from '@/commons/types/table-component.type';
import { useCriteriaStore } from '@/store/criteriaStore';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

export const criteriaColumns: TableComponentColumnDef[] = [
  {
    accessorKey: 'name',
    header: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { sortBy, sortOrder, setSortData } = useCriteriaStore();
      const isActive = sortBy === 'name';
      return (
        <div
          onClick={() => setSortData('name')}
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
    width: 'w-[820px]',
  },
  {
    accessorKey: 'subKriteria',
    header: () => (
      <div className="border-l px-4 border-gray-300">Sub Kriteria</div>
    ),
    width: 'w-[820px]',
  },
  {
    accessorKey: 'type',
    header: () => (
      <div className="border-x px-4 border-gray-300">Tipe Kriteria</div>
    ),
    width: 'w-[890px]',
  },
];
