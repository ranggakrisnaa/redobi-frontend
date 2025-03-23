import { DashboardContainerProps } from '@/commons/types/component-container-props.type';
import * as React from 'react';
import SideBarComponent from '../commons/SideBarComponent';

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  children,
}) => {
  return (
    <div className="flex w-full min-h-screen">
      <div className="fixed h-screen flex">
        <SideBarComponent />
      </div>
      <main className="flex-1 p-4 border-t overflow-y-auto min-h-screen pl-72">
        {children}
      </main>
    </div>
  );
};

export default DashboardContainer;
