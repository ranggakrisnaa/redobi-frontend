import { UpdateThesisKeywordSchema } from '@/commons/schema/update-thesis-keyword.schema';
import AlertComponent from '@/components/commons/AlertComponent';
import LoadingComponent from '@/components/commons/LoadingComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import UpdateThesisKeywordForm from '@/components/modules/thesis-keyword/UpdateThesisKeywordForm';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import {
  useThesisKeywordDetail,
  useThesisKeywordUpdate,
} from '@/hooks/useThesisKeyword';
import { useGlobalStore } from '@/store/globalStore';
import { useThesisKeywordStore } from '@/store/thesisKeywordStore';
import { Slash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ThesisKeywordUpdatePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setThesisKeywordId, thesiskeywordId } = useThesisKeywordStore();
  const currentPath = location.pathname;
  const { error } = useGlobalStore();
  const detailRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useThesisKeywordDetail();
  const { mutate } = useThesisKeywordUpdate();
  useScrollToTopOnPush(detailRef, [isLoading]);

  useEffect(() => {
    if (id) {
      setThesisKeywordId(id);
    }
  }, [id, setThesisKeywordId]);

  const handleSuccess = (data: UpdateThesisKeywordSchema) => {
    mutate({ data, id: thesiskeywordId as unknown as number });
  };

  return (
    <div>
      <DashboardContainer pageTitle="">
        <BreadcrumbList>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/thesis-keywords')}
              className={
                currentPath == '/thesis-keywords'
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Judul skripsi
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/thesis-keywords')}
              className={
                currentPath == `/thesis-keywords/${id}/update`
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Edit Judul Skripsi
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
                <UpdateThesisKeywordForm
                  onSuccess={handleSuccess}
                  data={data}
                />
              </CardContent>
            </Card>
          ) : null}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default ThesisKeywordUpdatePage;
