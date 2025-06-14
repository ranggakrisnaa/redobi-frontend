import { IRecommendation } from '@/commons/interface-model/recommendation-entity.interface';
import LoadingComponent from '@/components/commons/LoadingComponent.tsx'; // pastikan di-import
import DashboardContainer from '@/components/containers/DashboardContainer.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush.ts';
import { useStudentDetail } from '@/hooks/useStudent.ts';
import { useStudentStore } from '@/store/studentStore.ts';
import { FilePenLine, Slash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const StudentDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { setStudentId } = useStudentStore();
  const { data, isLoading } = useStudentDetail();
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      setStudentId(id);
    }
  }, [id, setStudentId]);

  useScrollToTopOnPush(detailRef, [isLoading]);

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="Profil Mahasiswa">
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
              onClick={() => navigate(`/students/${id}`)}
              className={
                currentPath == `/students/${id}`
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Profil Mahasiswa
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <LoadingComponent />
          </div>
        ) : (
          <div className="p-6 space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <Avatar className="w-[210px] h-[210px] border-4 border-white">
                    <AvatarImage src={data?.imageUrl} alt="Foto Mahasiswa" />
                    <AvatarFallback />
                  </Avatar>
                </div>
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    {data?.recommendation?.map(
                      (recommendation: IRecommendation, index: number) => (
                        <div key={recommendation.id}>
                          <p className="font-medium border-b p-2">
                            Dosen Pembimbing {index + 1}
                          </p>
                          <div className="p-2 flex items-center gap-4">
                            <div>
                              <Avatar className="w-[54px] h-[54px] border-4 border-white">
                                <AvatarImage
                                  src={
                                    'https://res.cloudinary.com/dbuyqvhts/image/upload/v1744100470/uploads/iczoe4d0fedfping1ns6.png'
                                  }
                                  alt="Foto Dosen Pembimbing"
                                />
                                <AvatarFallback />
                              </Avatar>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">
                                Nama Dosen : {recommendation.lecturer?.fullName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                NIDN : {recommendation.lecturer?.nidn}
                              </p>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">
                            Nama Mahasiswa
                          </TableCell>
                          <TableCell className="text-center">:</TableCell>
                          <TableCell>{data?.fullName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">NIM</TableCell>
                          <TableCell className="text-center">:</TableCell>
                          <TableCell>{data?.nim}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Tahun Masuk
                          </TableCell>
                          <TableCell className="text-center">:</TableCell>
                          <TableCell>{data?.tahunMasuk}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Jurusan</TableCell>
                          <TableCell className="text-center">:</TableCell>
                          <TableCell>{data?.major}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Kelas</TableCell>
                          <TableCell className="text-center">:</TableCell>
                          <TableCell>{data?.class}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium align-top">
                            Judul Skripsi
                          </TableCell>
                          <TableCell className="align-top text-center">
                            :
                          </TableCell>
                          <TableCell className="text-justify leading-relaxed">
                            {data?.judulSkripsi}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium align-top">
                            Abstrak
                          </TableCell>
                          <TableCell className="align-top text-center">
                            :
                          </TableCell>
                          <TableCell>
                            <p className="text-justify leading-relaxed whitespace-pre-line">
                              {data?.abstract}
                            </p>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <div className="text-end">
                      <Button
                        onClick={() => navigate(`/students/${id}/update`)}
                        className="bg-primary-500 hover:bg-blue-500 transition-all duration-200"
                      >
                        <FilePenLine />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </DashboardContainer>
    </div>
  );
};

export default StudentDetailPage;
