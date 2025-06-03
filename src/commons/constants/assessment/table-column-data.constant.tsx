import { TableComponentColumnDef } from '@/commons/types/table-component.type';
import { useAssessmentStore } from '@/store/assessmentStore';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

export const assessmentColumn: TableComponentColumnDef[] = [
  {
    accessorKey: 'lecturerName',
    header: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { sortBy, sortOrder, setSortData } = useAssessmentStore();
      const isActive = sortBy === 'lecturerName';
      return (
        <div
          className="flex gap-[5px] items-center justify-between cursor-pointer pl-4 border-l border-gray-300"
          onClick={() => setSortData('lecturerName')}
        >
          <span> Nama Dosen</span>
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
  },
  {
    accessorKey: 'criteriaName',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nama Kriteria</div>
    ),
  },
  {
    accessorKey: 'subCriteriaName',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nama Sub Kriteria</div>
    ),
  },
  {
    accessorKey: 'subCriteriaScores',
    header: () => <div className="border-x px-4 border-gray-300">Nilai</div>,
  },
];
