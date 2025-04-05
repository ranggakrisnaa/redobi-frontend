import { UUID } from 'crypto';
import * as React from 'react';

export type TableComponentItem = {
  id: UUID;
  avatar?: string;
  [key: string]: string | number | boolean | null | undefined;
};

export type TableComponentColumnDef = {
  accessorKey: string;
  header: (item?: any) => React.ReactNode;
  cell?: (item: any) => React.ReactNode;
  width?: string;
  minWidth?: string;
};
