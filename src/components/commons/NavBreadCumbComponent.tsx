import { NavBreadCumbComponentProps } from '@/commons/types/component-props.type.ts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb.tsx';
import { House } from 'lucide-react';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBreadCumbComponent: React.FC<NavBreadCumbComponentProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="py-[23.8px] flex justify-between">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate('/')}
                className={
                  currentPath == '/'
                    ? 'text-black font-medium hover:cursor-pointer'
                    : 'hover:cursor-pointer'
                }
              >
                <House className="w-[14px]" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            {children}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-2">
        <div>
          <h1>Notifikasi</h1>
        </div>
        <div>
          <h1>Pengaturan</h1>
        </div>
        <div>
          <h1>Keluar</h1>
        </div>
      </div>
    </div>
  );
};

export default NavBreadCumbComponent;
