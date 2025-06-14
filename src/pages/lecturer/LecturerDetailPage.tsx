import { TipePembimbingEnum } from '@/commons/enums/tipe-pembimbing.enum';
import LoadingComponent from '@/components/commons/LoadingComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useLecturerDetail } from '@/hooks/useLecturer';
import { usePaginationRecommendations } from '@/hooks/useRecommendation';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { useLecturerStore } from '@/store/lecturerStore';
import { FilePenLine, Slash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const LecturerDetailPage = () => {
  const { id } = useParams();
  const { setLecturerId } = useLecturerStore();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { data, isLoading } = useLecturerDetail();
  const { data: listRecommendations } = usePaginationRecommendations();
  const detailRef = useRef<HTMLDivElement>(null);
  useScrollToTopOnPush(detailRef, [isLoading]);
  console.log(data?.recommendation);

  const groupedStudents = listRecommendations?.data.reduce(
    (acc, curr) => {
      const studentId = curr.student?.id;
      if (!studentId) return acc;

      if (!acc[studentId]) {
        acc[studentId] = {
          student: curr.student,
          pembimbing1: null,
          pembimbing2: null,
        };
      }

      if (curr.position === TipePembimbingEnum.PEMBIMBING_SATU) {
        acc[studentId].pembimbing1 = curr.lecturer?.fullName ?? null;
      } else if (curr.position === TipePembimbingEnum.PEMBIMBING_DUA) {
        acc[studentId].pembimbing2 = curr.lecturer?.fullName ?? null;
      }

      return acc;
    },
    {} as Record<
      string,
      {
        student: (typeof listRecommendations.data)[number]['student'];
        pembimbing1: string | null;
        pembimbing2: string | null;
      }
    >,
  );
  console.log(groupedStudents);

  useEffect(() => {
    if (id) {
      setLecturerId(id);
    }
  }, [id, setLecturerId]);
  console.log(data?.recommendation);

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="Profil Dosen Pembimbing">
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
              onClick={() => navigate(`/lecturers/${id}`)}
              className={
                currentPath == `/lecturers/${id}`
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Profil Dosen Pembimbing
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingComponent />
            </div>
          ) : (
            <div className="p-6 space-y-6 mt-6 border-2 border-gray-200 rounded-xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="space-y-6 flex justify-center items-center">
                  <div className="flex justify-center">
                    <Avatar className="w-[210px] h-[210px] border-4 border-white">
                      <AvatarImage src={data?.imageUrl} alt="Foto Mahasiswa" />
                      <AvatarFallback />
                    </Avatar>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="pt-6">
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              Nama Dosen
                            </TableCell>
                            <TableCell className="text-right">:</TableCell>
                            <TableCell>{data?.fullName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">NIDN</TableCell>
                            <TableCell className="text-right">:</TableCell>
                            <TableCell>{data?.nidn}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Prodi</TableCell>
                            <TableCell className="text-right">:</TableCell>
                            <TableCell>{data?.prodi}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Kuota Bimbingan
                            </TableCell>
                            <TableCell className="text-right">:</TableCell>
                            <TableCell>{data?.kuotaBimbingan}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Jumlah Bimbingan
                            </TableCell>
                            <TableCell className="text-right">:</TableCell>
                            <TableCell>{data?.jumlahBimbingan}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="rounded-lg mt-10 overflow-hidden border-b-2">
                <div className="relative max-h-full overflow-y-auto">
                  <Table className="w-full min-w-[1000px] border-0">
                    <TableHeader className="bg-[#FEF7F7] text-gray-700 top-0 z-10 py-3">
                      <TableRow className="">
                        <TableHead className="p-0 text-black font-bold">
                          <div className="border-l-2 py-3 px-2">No</div>
                        </TableHead>
                        <TableHead className="p-0 font-bold text-black">
                          <div className="border-l-2 py-3 px-2">
                            Nama Mahasiswa
                          </div>
                        </TableHead>
                        <TableHead className="p-0 font-bold text-black">
                          <div className="border-l-2 py-1 px-2">
                            Jurusan <br />
                            Kelas
                          </div>
                        </TableHead>
                        <TableHead className="p-0 font-bold text-black">
                          <div className="border-l-2 py-3 px-2">
                            Judul Skripsi
                          </div>
                        </TableHead>
                        <TableHead className="p-0 font-bold text-black">
                          <div className="border-l-2 py-3 px-2">
                            Pembimbing 1
                          </div>
                        </TableHead>
                        <TableHead className="p-0 font-bold text-black">
                          <div className="border-x-2 py-3 px-2">
                            Pembimbing 2
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.values(groupedStudents || {}).map((mhs, idx) => (
                        <TableRow key={mhs.student?.id}>
                          <TableCell className="text-center">
                            {idx + 1}.
                          </TableCell>
                          <TableCell className="w-[400px]">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage
                                  src={mhs.student?.imageUrl}
                                  alt={mhs.student?.fullName}
                                />
                                <AvatarFallback>NM</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {mhs.student?.fullName}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {mhs.student?.nim}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="w-[200px]">
                            {mhs.student?.major} <br /> {mhs.student?.class}
                          </TableCell>
                          <TableCell className="whitespace-normal w-[600px]">
                            {mhs.student?.judulSkripsi}
                          </TableCell>
                          <TableCell>{mhs.pembimbing1}</TableCell>
                          <TableCell>{mhs.pembimbing2}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="text-end">
                <Button
                  onClick={() => navigate(`/lecturers/${id}/update`)}
                  className="bg-primary-500 hover:bg-blue-500 transition-all duration-200"
                >
                  <FilePenLine />
                  Edit
                </Button>
              </div>
            </div>
          )}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default LecturerDetailPage;
