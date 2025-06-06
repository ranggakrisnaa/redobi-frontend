import { CreateStudentSchema } from '@/commons/schema/create-student.schema.ts';
import AlertComponent from '@/components/commons/AlertComponent.tsx';
import LoadingComponent from '@/components/commons/LoadingComponent.tsx';
import DashboardContainer from '@/components/containers/DashboardContainer.tsx';
import CreateStudentForm from '@/components/modules/student/CreateStudentForm.tsx';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { useStudentCreate } from '@/hooks/useStudent.ts';
import { useGlobalStore } from '@/store/globalStore.ts';
import { Slash } from 'lucide-react';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StudentCreatePage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { mutate, isPending } = useStudentCreate();
  const { error, loading } = useGlobalStore();
  const detailRef = useRef<HTMLDivElement>(null);
  useScrollToTopOnPush(detailRef, [loading]);

  const handleSuccess = (data: CreateStudentSchema) => {
    mutate(data);
  };

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="Tambah Data Mahasiswa">
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
              onClick={() => navigate(`/students/create`)}
              className={
                currentPath == `/students/create`
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Tambah Data Mahasiswa
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
        <div className="mt-4">
          <Card>
            <CardContent className="relative">
              {loading && !isPending && (
                <div className="absolute inset-0 bg-white bg-opacity-60 z-10 flex justify-center items-center rounded-md">
                  <LoadingComponent />
                </div>
              )}
              {error && (
                <div className="py-2">
                  <AlertComponent>
                    <p>{error}</p>
                  </AlertComponent>
                </div>
              )}
              <CreateStudentForm onSuccess={handleSuccess} />
            </CardContent>
          </Card>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default StudentCreatePage;
