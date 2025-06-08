import { DashboardContainerProps } from '@/commons/types/component-props.type.ts';
import NavBreadCumbComponent from '@/components/commons/NavBreadCumbComponent.tsx';
import * as React from 'react';
import SideBarComponent from '../commons/SideBarComponent';

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  children,
  pageTitle,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="grid grid-cols-[284px_1fr] min-h-screen w-full">
      <aside className="w-auto sticky top-0 z-40 bg-gray-100">
        <SideBarComponent />
      </aside>

      <main className="overflow-y-auto min-h-full mb-5 relative overflow-x-hidden px-6">
        <NavBreadCumbComponent>
          {childrenArray[0]}
          {location.pathname === '/' && (
            <span className="font-medium text-black">Halaman Dashboard</span>
          )}
        </NavBreadCumbComponent>
        <div className="w-full border-t left-0 absolute"></div>
        <h1 className="text-2xl font-bold w-full mt-4">{pageTitle}</h1>
        {childrenArray[1]}
      </main>
    </div>
  );
};

export default DashboardContainer;
