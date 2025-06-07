import { UpdateLecturerSchema } from '@/commons/schema/update-lecturer.schema';
import AlertComponent from '@/components/commons/AlertComponent';
import LoadingComponent from '@/components/commons/LoadingComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import UpdateLecturerForm from '@/components/modules/lecturer/UpdateLecturerForm';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { useLecturerDetail, useLecturerUpdate } from '@/hooks/useLecturer';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { useGlobalStore } from '@/store/globalStore';
import { useLecturerStore } from '@/store/lecturerStore';
import { Slash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const LecturerUpdatePage = () => {
  const { id } = useParams();
  const { mutate } = useLecturerUpdate();
  const { error } = useGlobalStore();
  const { setLecturerId, lecturerId } = useLecturerStore();
  const navigate = useNavigate();
  const { data, isLoading } = useLecturerDetail();
  const location = useLocation();
  const currentPath = location.pathname;
  const detailRef = useRef<HTMLDivElement>(null);
  useScrollToTopOnPush(detailRef, [isLoading]);

  useEffect(() => {
    if (id) {
      setLecturerId(id);
    }
  }, [id, setLecturerId]);

  const handleSuccess = async (data: UpdateLecturerSchema) => {
    mutate({ data, id: lecturerId as string });
  };

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="Edit Data Dosen Pembimbing">
        <BreadcrumbList>
          <BreadcrumbSeparator>
            <Slash />
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
              onClick={() => navigate(`/lecturers/${lecturerId}/update`)}
              className={
                currentPath == `/lecturers/${lecturerId}/update`
                  ? 'text-black font-medium hover:cursor-pointer'
                  : ''
              }
            >
              Edit Data Dosen Pembimbing
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
        <div className="relative mt-4 min-h-full">
          {isLoading ? (
            <div className="absolute inset-0 bg-white bg-opacity-60 z-10 flex justify-center items-center rounded-md">
              <LoadingComponent />
            </div>
          ) : data ? (
            <Card>
              {error && (
                <div className="px-2 pt-2">
                  <AlertComponent>{error}</AlertComponent>
                </div>
              )}
              <CardContent>
                <UpdateLecturerForm onSuccess={handleSuccess} data={data} />
              </CardContent>
            </Card>
          ) : null}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default LecturerUpdatePage;
