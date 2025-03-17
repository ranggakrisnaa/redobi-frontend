import { DashboardContainerProps } from '@/types/component-container-props.type';
import SideBarComponent from '../commons/SideBarComponent';

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  children,
}) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideBarComponent />
      <main className="flex-1 p-4 border-t mt-[71.9px] max-w-full overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default DashboardContainer;
