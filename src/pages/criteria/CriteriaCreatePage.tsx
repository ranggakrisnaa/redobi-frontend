import { CreateCriteriaSchema } from '@/commons/schema/create-criteria.schema';
import AlertComponent from '@/components/commons/AlertComponent';
import LoadingComponent from '@/components/commons/LoadingComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import CreateCriteriaForm from '@/components/modules/criteria/CreateCriteriaForm';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { useCriteriaCreate } from '@/hooks/useCriteria';
import { useGlobalStore } from '@/store/globalStore';
import { Slash } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const CriteriaCreatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { error, loading } = useGlobalStore();
  const currentPath = location.pathname;
  const { mutate, isPending } = useCriteriaCreate();

  const handleSuccess = (data: CreateCriteriaSchema) => {
    mutate(data);
  };

  return (
    <DashboardContainer pageTitle="Tambah Data Kriteria dan Sub-kriteria">
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
                onClick={() => navigate('/criteria/create')}
                className={
                  currentPath == '/criteria/create'
                    ? 'text-black font-medium hover:cursor-pointer'
                    : 'hover:cursor-pointer'
                }
              >
                Tambah Data Kriteria & Sub-Kriteria
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbList>
      </div>
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
            <CreateCriteriaForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </div>
    </DashboardContainer>
  );
};

export default CriteriaCreatePage;
