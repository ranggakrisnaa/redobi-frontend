import { ReactNode } from 'react';

export type AuthContainerProps = {
  children: ReactNode;
};

export type DashboardContainerProps = {
  children: ReactNode;
  pageTitle: string | ReactNode;
};

export type AlertComponentProps = {
  children: ReactNode;
};

export type NavBreadCumbComponentProps = {
  children?: ReactNode;
};
