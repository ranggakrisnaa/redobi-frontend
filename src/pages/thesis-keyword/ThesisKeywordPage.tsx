import DashboardContainer from '@/components/containers/DashboardContainer';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { Slash } from 'lucide-react';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThesisKeywordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const detailRef = useRef<HTMLDivElement>(null);
  useScrollToTopOnPush(detailRef, [isLoading]);

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="Judul Skripsi">
        <BreadcrumbList>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/students')}
              className={
                currentPath == '/students'
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Judul Skripsi
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </DashboardContainer>
    </div>
  );
};

export default ThesisKeywordPage;
