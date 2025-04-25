import { UpdateCriteriaSchema } from '@/commons/schema/update-criteria.schema';
import AlertComponent from '@/components/commons/AlertComponent';
import LoadingComponent from '@/components/commons/LoadingComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import CriteriaUpdateForm from '@/components/modules/criteria/CriteriaUpdateForm';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { useCriteriaDetail, useCriteriaUpdate } from '@/hooks/useCriteria';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { useCriteriaStore } from '@/store/criteriaStore';
import { useGlobalStore } from '@/store/globalStore';
import { Slash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CriteriaUpdatePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { data, isLoading } = useCriteriaDetail();
  const { setCriteriaId, criteriaId } = useCriteriaStore();
  const { error } = useGlobalStore();
  const { mutate } = useCriteriaUpdate();
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      setCriteriaId(id);
    }
  }, [id, setCriteriaId]);

  useScrollToTopOnPush(detailRef, [isLoading]);

  const handleSuccess = async (data: UpdateCriteriaSchema) => {
    mutate({ data, id: criteriaId as number });
  };

  return (
    <div>
      <DashboardContainer pageTitle="">
        <div>
          <BreadcrumbList>
            <BreadcrumbList>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => navigate('/criteria')}
                  className="hover:cursor-pointer"
                >
                  Kriteria & Sub-Kriteria
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => navigate('/criteria/update')}
                  className={
                    currentPath == '/criteria/update'
                      ? 'text-black font-medium hover:cursor-pointer'
                      : 'hover:cursor-pointer'
                  }
                >
                  Update Data Kriteria & Sub-Kriteria
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
              {error && (
                <div className="px-2 pt-2">
                  <AlertComponent>{error}</AlertComponent>
                </div>
              )}
              <CardContent>
                <CriteriaUpdateForm data={data} onSuccess={handleSuccess} />
              </CardContent>
            </Card>
          ) : null}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default CriteriaUpdatePage;
