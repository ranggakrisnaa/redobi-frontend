import { TableComponentColumnDef } from '@/commons/types/table-component.type';

export const normalizationColumn: TableComponentColumnDef[] = [
  {
    accessorKey: 'name',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nama Dosen</div>
    ),
    width: '220px',
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nama Kriteria</div>
    ),
    width: '200px',
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nilai Normalisasi</div>
    ),
    width: '220px',
  },
];

export const rankingColumn: TableComponentColumnDef[] = [
  {
    accessorKey: 'name',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nama Dosen</div>
    ),
    width: '220px',
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nilai Final</div>
    ),
    width: '220px',
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className="border-l px-4 border-gray-300">Ranking Final</div>
    ),
    width: '220px',
  },
];
export const recommendationColumn: TableComponentColumnDef[] = [
  {
    accessorKey: 'name',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nama Mahasiswa</div>
    ),
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className="border-l px-4 border-gray-300">Dosen Pembimbing 1</div>
    ),
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nilai Rekomendasi</div>
    ),
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className="border-l px-4 border-gray-300">Dosen Pembimbing 2</div>
    ),
  },
  {
    accessorKey: 'name',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nilai Rekomendasi</div>
    ),
  },
];
