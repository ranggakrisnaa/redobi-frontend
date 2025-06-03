import { CreateAssessmentSchema } from '@/commons/schema/create-assessment.schema';
import AlertComponent from '@/components/commons/AlertComponent';
import LoadingComponent from '@/components/commons/LoadingComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import CreateAssessmentForm from '@/components/modules/assessment/CreateAssessmentForm';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { useAssessmentCreate } from '@/hooks/useAssessment';
import { useGlobalStore } from '@/store/globalStore';
import { Slash } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const AssessmentCreatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { error, loading } = useGlobalStore();
  const currentPath = location.pathname;
  const { mutate, isPending } = useAssessmentCreate();

  const handleSuccess = (data: CreateAssessmentSchema) => {
    mutate(data);
  };

  return (
    <DashboardContainer pageTitle="Tambah Data Penilaian Dosen">
      <BreadcrumbList>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => navigate('/assessments')}
            className="hover:cursor-pointer"
          >
            Penilaian Dosen
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => navigate('/assessments/create')}
            className={
              currentPath == '/assessments/create'
                ? 'text-black font-medium hover:cursor-pointer'
                : 'hover:cursor-pointer'
            }
          >
            Tambah Data Penilaian Dosen
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
            <CreateAssessmentForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </div>
    </DashboardContainer>
  );
};

export default AssessmentCreatePage;
