import { UpdateAssessmentSchema } from '@/commons/schema/update-assessment.schema';
import AlertComponent from '@/components/commons/AlertComponent';
import LoadingComponent from '@/components/commons/LoadingComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import UpdateAssessmentForm from '@/components/modules/assessment/UpdateAssessmentForm';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import {
  useAssessmentDetail,
  useAssessmentUpdate,
} from '@/hooks/useAssessment';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { useAssessmentStore } from '@/store/assessmentStore';
import { useGlobalStore } from '@/store/globalStore';
import { Slash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AssessmentUpdatePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { error } = useGlobalStore();
  const currentPath = location.pathname;
  const { data, isLoading } = useAssessmentDetail();
  const { assessmentId, setAsessmentId } = useAssessmentStore();
  const { mutate } = useAssessmentUpdate();
  const detailRef = useRef<HTMLDivElement>(null);
  useScrollToTopOnPush(detailRef, [isLoading]);

  useEffect(() => {
    if (id) {
      setAsessmentId(id);
    }
  }, [id, setAsessmentId]);

  const handleSuccess = async (data: UpdateAssessmentSchema) => {
    mutate({ data, id: assessmentId as string });
  };

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="Edit Data Penilaian Dosen">
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
              onClick={() => navigate(`/assessments/${assessmentId}/update`)}
              className={
                currentPath == `/assessments/${assessmentId}/update`
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Edit Data Penilaian Dosen
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
                <UpdateAssessmentForm onSuccess={handleSuccess} data={data} />
              </CardContent>
            </Card>
          ) : null}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AssessmentUpdatePage;
