import { ISubCriteria } from '@/commons/interface-model/sub-criteria-entity.entity';
import LoadingComponent from '@/components/commons/LoadingComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCriteriaDetail } from '@/hooks/useCriteria';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { useCriteriaStore } from '@/store/criteriaStore';
import { FilePenLine, Slash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CriteriaDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCriteriaId } = useCriteriaStore();
  const location = useLocation();
  const currentPath = location.pathname;
  const { data, isLoading } = useCriteriaDetail();
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      setCriteriaId(id as unknown as number);
    }
  }, [id, setCriteriaId]);

  useScrollToTopOnPush(detailRef, [isLoading]);

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="Detail Kriteria dan Sub-Kriteria">
        <div>
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
                onClick={() => navigate(`/criteria/${id}`)}
                className={
                  currentPath == `/criteria/${id}`
                    ? 'text-black font-medium hover:cursor-pointer'
                    : 'hover:cursor-pointer'
                }
              >
                Detail Kriteria & Sub-Kriteria
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </div>
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingComponent />
            </div>
          ) : (
            <Card className="mt-3">
              <CardContent className="px-3 py-3">
                <Card className="rounded-lg mb-4">
                  <CardContent className="p-4">
                    <Table className="w-full">
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium text-left w-1/4">
                            Nama Kriteria
                          </TableCell>
                          <TableCell className="text-left w-[2%]">:</TableCell>
                          <TableCell className="text-left w-3/4">
                            {data?.name}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-left w-1/4">
                            Tipe Kriteria
                          </TableCell>
                          <TableCell className="text-left w-[2%]">:</TableCell>
                          <TableCell className="text-left w-3/4">
                            {data?.type}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium text-left w-1/4">
                            Pembobotan Kriteria
                          </TableCell>
                          <TableCell className="text-left w-[2%]">:</TableCell>
                          <TableCell className="text-left w-3/4">
                            {data?.weight}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Table className="w-full mt-3">
                      <TableHeader className="bg-[#FEF7F7] text-black top-0 z-10 py-3">
                        <TableRow>
                          <TableHead className="text-black pl-0">
                            <div className="border-l-2 pl-2">Sub-Kriteria</div>
                          </TableHead>
                          <TableHead className="text-black pl-0">
                            <div className="border-l-2 pl-2">
                              Pembobotan Sub-Kriteria
                            </div>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data?.subCriteria?.map((subCriteria: ISubCriteria) => (
                          <>
                            <TableRow>
                              <TableCell>{subCriteria.name}</TableCell>
                              <TableCell>{subCriteria.weight}</TableCell>
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <div className="text-end">
                  <Button
                    onClick={() => navigate(`/criteria/${id}/update`)}
                    className="bg-primary-500 hover:bg-blue-500 transition-all duration-200"
                  >
                    <FilePenLine />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default CriteriaDetailPage;
