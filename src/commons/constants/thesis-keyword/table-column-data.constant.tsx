import { TableComponentColumnDef } from '@/commons/types/table-component.type';

export const thesisKeywordColumn: TableComponentColumnDef[] = [
  {
    accessorKey: 'category',
    header: () => (
      <div className="border-l pl-4 border-gray-300">
        Kategori Judul Skripsi
      </div>
    ),
    width: 'w-[800px]',
  },
  {
    accessorKey: 'keywords',
    header: () => <div className="border-x pl-4 border-gray-300">Keyword</div>,
    width: 'w-[800px]',
  },
];
