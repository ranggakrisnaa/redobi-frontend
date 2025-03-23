import { UUID } from 'crypto';
import * as React from 'react';

export type TableComponentItem = {
  id: UUID;
  avatar?: string;
  [key: string]: string | number | boolean | null | undefined;
};

export type TableComponentColumnDef = {
  accessorKey: string;
  header: string;
  cell?: (item: any) => React.ReactNode;
  width?: string;
  minWidth?: string;
};
