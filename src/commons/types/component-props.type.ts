import { ReactNode } from 'react';

export type AuthContainerProps = {
  children: ReactNode;
};

export type DashboardContainerProps = {
  children: ReactNode;
  pageTitle: string;
};

export type AlertComponentProps = {
  children: ReactNode;
};

export type NavBreadCumbComponentProps = {
  children?: ReactNode;
};
