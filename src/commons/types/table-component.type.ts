import * as React from 'react';

export type TableComponentItem = {
  id: any;
  assessmentId?: string;
  avatar?: string;
  [key: string]: string | number | boolean | null | undefined | JSX.Element[];
};

export type TableComponentColumnDef = {
  accessorKey: string;
  header: (item?: any) => React.ReactNode;
  cell?: (item: any) => React.ReactNode;
  width?: string;
  minWidth?: string;
};
