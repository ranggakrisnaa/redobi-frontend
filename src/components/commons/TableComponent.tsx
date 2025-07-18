import { TableComponentProps } from '@/commons/interfaces/table-component.interface.ts';
import { TableComponentItem } from '@/commons/types/table-component.type.ts';
import { Checkbox } from '@/components/ui/checkbox';
import { useGlobalStore } from '@/store/globalStore.ts';
import {
  Database,
  Eye,
  PencilLine,
  Plus,
  RefreshCcwDot,
  Repeat2,
  SearchX,
} from 'lucide-react';
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
import EmptyState from './EmptyStateComponent';

const TableComponent: React.FC<TableComponentProps<TableComponentItem>> = ({
  data,
  columns,
  pathDetail,
  onDelete,
  isDetail = true,
  isMatriks,
}) => {
  const navigate = useNavigate();
  const { selected, setSelected, isSearch } = useGlobalStore();
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
    const allIds = data.map((item) => item.assessmentId || item.id);
    setSelected(isAllSelected ? [] : allIds);
  };

  const extractText = (value: any): string => {
    if (typeof value === 'string') return value;
    if (Array.isArray(value) && typeof value[0]?.props?.children === 'string') {
      return value[0].props.children;
    }
    return '';
  };

  const shouldAddBorder = (currentItem: any, currentIndex: number) => {
    const nextItem = data[currentIndex + 1];
    if (!nextItem) return true;

    const currentLecturer = extractText(currentItem.lecturerName);
    const nextLecturer = extractText(nextItem.lecturerName);

    const currentCriteria = extractText(currentItem.criteriaName);
    const nextCriteria = extractText(nextItem.criteriaName);

    if (currentCriteria) return false;

    return currentLecturer !== nextLecturer && currentCriteria !== nextCriteria;
  };

  if (isSearch !== null && data.length === 0) {
    return (
      <div className="rounded-lg mt-4 overflow-hidden border-y-2">
        <div className="relative max-h-full overflow-y-auto">
          <Table className="w-full min-w-[1000px] border-0">
            <TableHeader className="bg-[#FEF7F7] text-gray-700 top-0 z-10 py-3">
              <TableRow>
                <TableHead className="text-center">
                  <Checkbox
                    checked={false}
                    disabled
                    className="border-[#fffff] data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 data-[state=checked]:text-primary-foreground size-5"
                  />
                </TableHead>
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className={`text-black ${column.width || ''}`}
                  >
                    {column.header()}
                  </TableHead>
                ))}
                {!isMatriks ? (
                  <TableHead className="w-32 text-center border-gray-300 text-black">
                    Aksi
                  </TableHead>
                ) : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + 2} className="h-64">
                  <EmptyState
                    icon={SearchX}
                    title="Data tidak ditemukan."
                    description="Data belum tersedia. Cari dengan Keyword lain."
                    actionLabel="Tambah Data"
                    variant="minimal"
                    size="medium"
                    className="py-8"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  } else if (isSearch == null && data.length === 0) {
    return (
      <div className="rounded-lg mt-4 overflow-hidden border-y-2">
        <div className="relative max-h-full overflow-y-auto">
          <Table className="w-full min-w-[1000px] border-0">
            <TableHeader className="bg-[#FEF7F7] text-gray-700 top-0 z-10 py-3">
              <TableRow>
                <TableHead className="text-center">
                  <Checkbox
                    checked={false}
                    disabled
                    className="border-[#fffff] data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 data-[state=checked]:text-primary-foreground size-5"
                  />
                </TableHead>
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className={`text-black ${column.width || ''}`}
                  >
                    {column.header()}
                  </TableHead>
                ))}
                {!isMatriks ? (
                  <TableHead className="w-32 text-center border-gray-300 text-black">
                    Aksi
                  </TableHead>
                ) : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + 2} className="h-64">
                  <EmptyState
                    icon={isMatriks ? Repeat2 : Database}
                    title={
                      isMatriks
                        ? 'Data Matriks Belum di Generate'
                        : 'Belum Ada Data'
                    }
                    description={
                      isMatriks
                        ? 'Generate data matriks terlebih dahulu untuk melihat hasil normalisasi dan ranking matriks.'
                        : 'Data belum tersedia. Mulai dengan menambahkan data pertama Anda.'
                    }
                    actionLabel={
                      isMatriks ? 'Generate Matriks Data' : 'Tambah Data'
                    }
                    onAction={
                      !isMatriks
                        ? () => navigate(`/${pathDetail}/create`)
                        : () =>
                            (window.location.href = `/recommendations?create=true`)
                    }
                    actionIcon={isMatriks ? RefreshCcwDot : Plus}
                    variant="minimal"
                    size="medium"
                    className="py-8"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg mt-4 overflow-hidden border-y-2">
      <div className="relative max-h-full overflow-y-auto">
        <Table className="w-full min-w-[1000px] border-0">
          <TableHeader className="bg-[#FEF7F7] text-gray-700 top-0 z-10 py-3">
            <TableRow>
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
                  className={`text-black ${column.width || ''}`}
                >
                  {column.header()}
                </TableHead>
              ))}
              {!isMatriks ? (
                <TableHead className="w-32 text-center border-gray-300 text-black">
                  Aksi
                </TableHead>
              ) : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any, index: number) => (
              <TableRow
                key={item.id}
                className={`${shouldAddBorder(item, index) ? 'border-b' : 'border-b-0'} hover:bg-gray-50 ${!item.assessmentTable && 'border-b'} ${item.isNewLecturer && 'border-t'}`}
              >
                <TableCell className="text-center align-top">
                  {(item.isNewLecturer || !item.showOneRowActions) && (
                    <Checkbox
                      checked={selected.includes(item.assessmentId || item.id)}
                      onCheckedChange={() =>
                        toggleSelect(item.assessmentId || item.id)
                      }
                      className="border-[#ffffff] data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 data-[state=checked]:text-primary-foreground size-5"
                    />
                  )}
                </TableCell>
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={`px-6 align-top text-left ${
                      colIndex >= 1 && colIndex <= 3 && item.isNewCriteria
                        ? 'border-t'
                        : ''
                    }`}
                  >
                    {column.cell ? column.cell(item) : item[column.accessorKey]}
                  </TableCell>
                ))}
                {!isMatriks && (
                  <TableCell>
                    {(item.showOneRowActions && item.isNewLecturer) ||
                    (!item.showOneRowActions && !isMatriks) ? (
                      <div className="flex justify-center items-center gap-2">
                        {isDetail ? (
                          <button
                            onClick={() =>
                              navigate(
                                `/${pathDetail}/${item.assessmentId || item.id}`,
                              )
                            }
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye size={18} />
                          </button>
                        ) : null}
                        <button
                          className="text-yellow-600 hover:text-yellow-800"
                          onClick={() =>
                            navigate(
                              `/${pathDetail}/${item.assessmentId || item.id}/update`,
                            )
                          }
                        >
                          <PencilLine size={18} />
                        </button>
                        <DeleteConfirmationComponent
                          isSingle={true}
                          onConfirm={async () => {
                            if (onDelete) {
                              await onDelete(item.assessmentId || item.id);
                            }
                            return true;
                          }}
                        />
                      </div>
                    ) : null}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableComponent;
