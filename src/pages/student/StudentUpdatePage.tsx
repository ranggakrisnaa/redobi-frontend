import { UpdateStudentSchema } from '@/commons/schema/update-student.schema';
import AlertComponent from '@/components/commons/AlertComponent';
import LoadingComponent from '@/components/commons/LoadingComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import UpdateStudentForm from '@/components/modules/student/UpdateStudentForm';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { useStudentDetail, useStudentUpdate } from '@/hooks/useStudent';
import { useGlobalStore } from '@/store/globalStore';
import { useStudentStore } from '@/store/studentStore';
import { Slash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const StudentUpdatePage = () => {
  const { id } = useParams();
  const { mutate } = useStudentUpdate();
  const { error } = useGlobalStore();
  const { setStudentId, studentId } = useStudentStore();
  const navigate = useNavigate();
  const { data, isLoading } = useStudentDetail();
  const location = useLocation();
  const currentPath = location.pathname;
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      setStudentId(id);
    }
  }, [id, setStudentId]);

  useScrollToTopOnPush(detailRef, [isLoading]);

  const handleSuccess = async (data: UpdateStudentSchema) => {
    mutate({ data, id: studentId as string });
  };

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="Edit Data Mahasiswa">
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
                  onClick={() => navigate(`/students/${studentId}/update`)}
                  className={
                    currentPath == `/students/${studentId}/update`
                      ? 'text-black font-medium hover:cursor-pointer'
                      : ''
                  }
                >
                  Edit Data Mahasiswa
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </BreadcrumbList>
        </div>
        <div className="relative mt-4 min-h-full">
          {isLoading ? (
            <div className="absolute inset-0 bg-white bg-opacity-60 z-10 flex justify-center items-center rounded-md">
              <LoadingComponent />
            </div>
          ) : data ? (
            <Card>
              {error && <AlertComponent>{error}</AlertComponent>}
              <CardContent>
                <UpdateStudentForm onSuccess={handleSuccess} data={data} />
              </CardContent>
            </Card>
          ) : null}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default StudentUpdatePage;
