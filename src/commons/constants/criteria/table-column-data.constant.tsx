import { TableComponentColumnDef } from '@/commons/types/table-component.type';

export const criteriaColumns: TableComponentColumnDef[] = [
  {
    accessorKey: 'name',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nama Kriteria</div>
    ),
    width: 'w-[320px]',
  },
  {
    accessorKey: 'subKriteria',
    header: () => (
      <div className="border-l px-4 border-gray-300">Sub Kriteria</div>
    ),
    width: 'w-[320px]',
  },
  {
    accessorKey: 'subCriteriaWeight',
    header: () => (
      <div className="border-l px-4 border-gray-300">
        Pembobotan Sub-Kriteria
      </div>
    ),
    width: 'w-[350px]',
  },
  {
    accessorKey: 'type',
    header: () => (
      <div className="border-l px-4 border-gray-300">Tipe Kriteria</div>
    ),
    width: 'w-[180px]',
  },
  {
    accessorKey: 'criteriaWeight',
    header: () => (
      <div className="border-l px-4 border-r border-gray-300">
        Pembobotan Kriteria
      </div>
    ),
    width: 'w-[280px]',
  },
];
