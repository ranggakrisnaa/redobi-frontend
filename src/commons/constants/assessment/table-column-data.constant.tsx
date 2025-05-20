import { TableComponentColumnDef } from '@/commons/types/table-component.type';

export const assessmentColumn: TableComponentColumnDef[] = [
  {
    accessorKey: 'lecturerName',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nama Dosen</div>
    ),
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
    header: () => <div className="border-l px-4 border-gray-300">Nilai</div>,
  },
];
