import {
  TableComponentColumnDef,
  TableComponentItem,
} from '@/commons/types/table-component.type.ts';

export interface TableComponentProps<T extends TableComponentItem> {
  data: T[];
  columns: TableComponentColumnDef[];
  title?: string;
  onSort?: (sort: string) => void;
  onDelete?: (id: any) => Promise<boolean>;
  pathDetail?: string;
  isDetail?: boolean;
  isMatriks?: boolean;
}
