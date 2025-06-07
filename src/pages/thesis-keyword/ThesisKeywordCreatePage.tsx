import { CreateThesisKeywordSchema } from '@/commons/schema/create-thesis-keyword.schema';
import AlertComponent from '@/components/commons/AlertComponent';
import LoadingComponent from '@/components/commons/LoadingComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import CreateThesisKeywordForm from '@/components/modules/thesis-keyword/CreateThesisKeywordForm';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { useThesisKeywordCreate } from '@/hooks/useThesisKeyword';
import { useGlobalStore } from '@/store/globalStore';
import { Slash } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThesisKeywordCreatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading } = useGlobalStore();
  const currentPath = location.pathname;
  const { mutate, isPending } = useThesisKeywordCreate();

  const handleSuccess = (data: CreateThesisKeywordSchema) => {
    mutate(data);
  };

  return (
    <div>
      <DashboardContainer pageTitle="Tambah Judul Skripsi">
        <BreadcrumbList>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/thesis-keywords')}
              className="hover:cursor-pointer"
            >
              Judul Skripsi
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/thesis-keywords/create')}
              className={
                currentPath == '/thesis-keywords/create'
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Tambah Judul Skripsi
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
              <CreateThesisKeywordForm onSuccess={handleSuccess} />
            </CardContent>
          </Card>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default ThesisKeywordCreatePage;
