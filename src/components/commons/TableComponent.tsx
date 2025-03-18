import { TableComponentProps } from '@/commons/interfaces/table-component.interface.ts';
import { TableComponentItem } from '@/commons/types/table-component.type.ts';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const TableComponent = <T extends TableComponentItem>({
  data,
  columns,
}: TableComponentProps<T>) => {
  const [selected, setSelected] = useState<number[]>([]);
  const isAllSelected = selected.length === data.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(data.map((item) => item.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="rounded-lg mt-10 overflow-hidden border-b-4">
      <div className="relative max-h-96 overflow-y-auto">
        <Table className="w-full min-w-[1000px] border-0">
          <TableHeader className="bg-gray-100 text-gray-700 sticky top-0 z-10 shadow-none">
            <TableRow>
              <TableHead className="min-w-[40px] text-center">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={() => toggleSelectAll()}
                  className="size-4"
                />
              </TableHead>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={`font-bold text-black ${column.width || ''}`}
                >
                  {column.header}
                </TableHead>
              ))}
              <TableHead className="w-32 text-center font-bold text-black">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className="border-b hover:bg-gray-50">
                <TableCell className="text-center">
                  <Checkbox
                    checked={selected.includes(item.id)}
                    onCheckedChange={() => toggleSelect(item.id)}
                    className="size-4"
                  />
                </TableCell>
                {columns.map((column, index) => (
                  <TableCell key={index} className="py-2">
                    {column.cell ? column.cell(item) : item[column.accessorKey]}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex justify-center items-center gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-800">
                      <Pencil size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableComponent;
