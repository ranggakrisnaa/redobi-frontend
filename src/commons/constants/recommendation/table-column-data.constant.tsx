import { TableComponentColumnDef } from '@/commons/types/table-component.type';

export const normalizationColumn: TableComponentColumnDef[] = [
  {
    accessorKey: 'lecturerName',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nama Dosen</div>
    ),
    width: '250px',
  },
  {
    accessorKey: 'criteriaName',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nama Kriteria</div>
    ),
    width: '200px',
  },
  {
    accessorKey: 'normalizedValue',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nilai Normalisasi</div>
    ),
    width: '200px',
  },
];

export const rankingColumn: TableComponentColumnDef[] = [
  {
    accessorKey: 'lecturerName',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nama Dosen</div>
    ),
    width: '220px',
  },
  {
    accessorKey: 'finalScore',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nilai Final</div>
    ),
    width: '220px',
  },
  {
    accessorKey: 'rank',
    header: () => (
      <div className="border-l px-4 border-gray-300">Ranking Final</div>
    ),
    width: '220px',
  },
];
export const recommendationColumn: TableComponentColumnDef[] = [
  {
    accessorKey: 'studentName',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nama Mahasiswa</div>
    ),
  },
  {
    accessorKey: 'lecturerFirst',
    header: () => (
      <div className="border-l px-4 border-gray-300">Dosen Pembimbing 1</div>
    ),
  },
  {
    accessorKey: 'valueFirst',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nilai Rekomendasi</div>
    ),
  },
  {
    accessorKey: 'lecturerSecond',
    header: () => (
      <div className="border-l px-4 border-gray-300">Dosen Pembimbing 2</div>
    ),
  },
  {
    accessorKey: 'valueSecond',
    header: () => (
      <div className="border-l px-4 border-gray-300">Nilai Rekomendasi</div>
    ),
  },
];
