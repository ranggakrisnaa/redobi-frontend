import { CreateLecturerSchema } from '@/commons/schema/create-lecturer.schema';
import AlertComponent from '@/components/commons/AlertComponent';
import LoadingComponent from '@/components/commons/LoadingComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import CreateLecturerForm from '@/components/modules/lecturer/CreateLecturerForm';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { useLecturerCreate } from '@/hooks/useLecturer';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { useGlobalStore } from '@/store/globalStore';
import { Slash, SlashIcon } from 'lucide-react';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LecturerCreatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { error, loading } = useGlobalStore();
  const { mutate, isPending } = useLecturerCreate();
  const detailRef = useRef<HTMLDivElement>(null);
  useScrollToTopOnPush(detailRef, [loading]);

  const handleSuccess = (data: CreateLecturerSchema) => {
    mutate(data);
  };

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="Tambah Data Mahasiswa">
        <BreadcrumbList>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/lecturers')}
              className="hover:cursor-pointer"
            >
              Dosen Pembimbing
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate(`/lecturers/create`)}
              className={
                currentPath == `/lecturers/create`
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Tambah Data Dosen Pembimbing
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
              <CreateLecturerForm onSuccess={handleSuccess} />
            </CardContent>
          </Card>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default LecturerCreatePage;
