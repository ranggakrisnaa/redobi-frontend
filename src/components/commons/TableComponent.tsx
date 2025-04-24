import { TableComponentProps } from '@/commons/interfaces/table-component.interface.ts';
import { TableComponentItem } from '@/commons/types/table-component.type.ts';
import { Checkbox } from '@/components/ui/checkbox';
import { useGlobalStore } from '@/store/globalStore.ts';
import { Eye, PencilLine } from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import DeleteConfirmationComponent from './DeleteConfirmationComponent';

const TableComponent: React.FC<TableComponentProps<TableComponentItem>> = ({
  data,
  columns,
  pathDetail,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { selected, setSelected } = useGlobalStore();
  const isAllSelected =
    data.length > 0 && selected.length === data.map((item) => item.id).length;

  const toggleSelect = (id: string | number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((itemId) => itemId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const toggleSelectAll = () => {
    const allIds = data.map((item) => item.id);
    setSelected(isAllSelected ? [] : allIds);
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
            {data.map((item) => (
              <TableRow key={item.id} className="border-b hover:bg-gray-50">
                <TableCell className="text-center">
                  <Checkbox
                    checked={selected.includes(item.id)}
                    onCheckedChange={() => toggleSelect(item.id)}
                    className="border-[#ffffff] data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 data-[state=checked]:text-primary-foreground size-5"
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
                    <button
                      className="text-yellow-600 hover:text-yellow-800"
                      onClick={() =>
                        navigate(`/${pathDetail}/${item.id}/update`)
                      }
                    >
                      <PencilLine size={18} />
                    </button>
                    <DeleteConfirmationComponent
                      isSingle={true}
                      onConfirm={async () => {
                        await onDelete(item.id);
                        return true;
                      }}
                    />
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
