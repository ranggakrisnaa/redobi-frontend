import { NavBreadCumbComponentProps } from '@/commons/types/component-props.type.ts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb.tsx';
import { Bell, House, LogOut, Settings } from 'lucide-react';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBreadCumbComponent: React.FC<NavBreadCumbComponentProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="py-[23.8px] flex items-center justify-between">
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
        <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-blue-100 text-blue-900 text-sm font-medium hover:bg-blue-200 transition">
          <Bell className="w-4 h-4" />
          Notifikasi
        </button>
        <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300 transition">
          <Settings className="w-4 h-4" />
          Pengaturan
        </button>
        <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition">
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default NavBreadCumbComponent;
