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
    <div className="flex w-full min-h-screen">
      <div className="fixed h-screen flex z-40">
        <SideBarComponent />
      </div>
      <main className="flex-1 pb-4 px-6 overflow-y-auto min-h-screen pl-[284px] relative overflow-x-hidden">
        <NavBreadCumbComponent>{childrenArray[0]}</NavBreadCumbComponent>
        <div className="absolute left-[255px] w-full border-t"></div>
        <h1 className="text-2xl font-bold w-full mt-4">{pageTitle}</h1>
        {childrenArray[1]}
      </main>
    </div>
  );
};

export default DashboardContainer;
