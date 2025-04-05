import { TableComponentProps } from '@/commons/interfaces/table-component.interface.ts';
import { TableComponentItem } from '@/commons/types/table-component.type.ts';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const TableComponent: React.FC<TableComponentProps<TableComponentItem>> = ({
  data,
  columns,
  pathDetail,
}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number[]>([]);
  const isAllSelected = selected.length === data.length;

  const toggleSelectAll = () => {
    setSelected(isAllSelected ? [] : data.map((_item, index) => index));
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="rounded-lg mt-10 overflow-hidden border-b-4">
      <div className="relative max-h-full overflow-y-auto">
        <Table className="w-full min-w-[1000px] border-0">
          <TableHeader className="bg-[#FEF7F7] text-gray-700 top-0 z-10 py-3">
            <TableRow className="">
              <TableHead className="text-center">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                  className="border-[#fffff] data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 data-[state=checked]:text-primary-foreground size-5"
                />
              </TableHead>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={`font-bold text-black ${column.width || ''}`}
                >
                  {column.header()}
                </TableHead>
              ))}
              <TableHead className="w-32 text-center border-gray-300 font-bold text-black">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {data.map((item, index) => (
              <TableRow key={item.id} className="border-b hover:bg-gray-50">
                <TableCell className="text-center">
                  <Checkbox
                    checked={selected.includes(index)}
                    onCheckedChange={() => toggleSelect(index)}
                    className="border-[#fffff] data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 size-5 data-[state=checked]:text-primary-foreground"
                  />
                </TableCell>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className="px-6">
                    {column.cell ? column.cell(item) : item[column.accessorKey]}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => navigate(`/${pathDetail}/${item.id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
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
