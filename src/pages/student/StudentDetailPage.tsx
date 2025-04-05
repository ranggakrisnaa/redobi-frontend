import DashboardContainer from '@/components/containers/DashboardContainer.tsx';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { Slash } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const StudentDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  return (
    <DashboardContainer pageTitle="Detail Item">
      <div>
        <BreadcrumbList>
          <BreadcrumbList>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate('/students')}
                className="hover:cursor-pointer"
              >
                Mahasiswa
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate(`/students/${id}`)}
                className={
                  currentPath == `/students/${id}`
                    ? 'text-black font-medium hover:cursor-pointer'
                    : ''
                }
              >
                Detail Mahasiswa
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbList>
      </div>
      <div>
        <p>ID: {id}</p>
      </div>
    </DashboardContainer>
  );
};

export default StudentDetailPage;
