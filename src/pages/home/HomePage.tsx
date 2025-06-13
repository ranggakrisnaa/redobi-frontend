import hello from '@/assets/images/hello.png';
import ChartAreaComponent from '@/components/commons/ChartAreaComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGetStatistics } from '@/hooks/useStatistics';
import {
  Award,
  BarChart3,
  BookOpen,
  Monitor,
  PieChart,
  Target,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data: statistics } = useGetStatistics();
  const [progress, setProgress] = useState<{
    guidance: number;
  }>({
    guidance: 0,
  });
  const [majorCount, setMajorCount] = useState<number[]>([0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((prev) => ({
        ...prev,
        guidance: statistics?.data.guidanceProgress.percentageGuidance ?? 0,
      }));
    }, 500);
    return () => clearTimeout(timer);
  }, [statistics?.data.guidanceProgress]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (statistics?.data.getMajorTotal) {
        const counts = statistics.data.getMajorTotal.map(
          (major) => major.majorCount,
        );
        setMajorCount(counts);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [statistics?.data.getMajorTotal]);

  return (
    <div className="w-full h-full">
      <DashboardContainer
        pageTitle={
          <div className="flex items-center gap-2 font-sem">
            Selamat Datang Di Redobi
            <img
              src={hello}
              alt="Logo"
              width={24}
              height={24}
              className="inline-block"
            />
          </div>
        }
      >
        <div></div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Section - Progress Cards */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="mt-3">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-sm text-gray-600 mb-2">
                      Mahasiswa yang telah mendapat dosen pembimbing
                    </h3>
                    <div className="flex items-center gap-3 justify-center">
                      <Progress
                        value={progress.guidance}
                        className="h-3 [&>div]:bg-[#002C8C]"
                      />
                      <p className="text-right text-md font-semibold">
                        {progress.guidance}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {statistics?.data.guidanceProgress.countStudentGuidance}
                      </div>
                      <p className="text-sm text-gray-600">
                        Mahasiswa Sudah Mendapat Dosen Pembimbing
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-red-600 mb-1">
                        {
                          statistics?.data.guidanceProgress
                            .countStudentUnguidance
                        }
                      </div>
                      <p className="text-sm text-gray-600">
                        Mahasiswa Belum Mendapat Dosen Pembimbing
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">
                      Jumlah Mahasiswa
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {statistics?.data.countTotalData.countStudentTotal}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-green-50">
                  <CardContent className="p-4 text-center">
                    <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">Jumlah Dosen</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {' '}
                      {statistics?.data.countTotalData.countLecturerTotal}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50">
                  <CardContent className="p-4 text-center">
                    <Award className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">
                      Jumlah Kriteria
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {statistics?.data.countTotalData.countCriteriaTotal}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50">
                  <CardContent className="p-4 text-center">
                    <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">
                      Jumlah Sub-Kriteria
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {' '}
                      {statistics?.data.countTotalData.countSubCriteriaTotal}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <ChartAreaComponent />
            </div>

            {/* Right Section - Calendar and Progress */}
            <div className="space-y-6">
              {/* Calendar */}
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full rounded-lg border mt-3"
              />

              <div className="space-y-4">
                {/* Progress Indicators */}
                {statistics?.data.getMajorTotal.map((major, idx) => (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                          {major.major == 'Rekayasa Perangkat Lunak' ? (
                            <BarChart3 className="w-8 h-8 text-teal-600" />
                          ) : major.major == 'Multimedia' ? (
                            <Monitor className="w-8 h-8 text-teal-600" />
                          ) : (
                            <PieChart className="w-8 h-8 text-teal-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-base text-gray-600 mb-2">
                            {major.major}
                          </p>
                          <div className="flex items-center gap-3">
                            <Progress
                              value={majorCount[idx]}
                              className="flex-1 h-3 [&>div]:bg-teal-600"
                            />
                            <span className="text-base font-semibold text-teal-600">
                              {major.majorCount}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                        <PieChart className="w-8 h-8 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base text-gray-600 mb-2">
                          Sistem Cerdas
                        </p>
                        <div className="flex items-center gap-3">
                          <Progress
                            value={progress.sc}
                            className="flex-1 h-3 [&>div]:bg-orange-600"
                          />
                          <span className="text-base font-semibold text-orange-600">
                            {progress.sc}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                        <Monitor className="w-8 h-8 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base text-gray-600 mb-2">
                          Multimedia
                        </p>
                        <div className="flex items-center gap-3">
                          <Progress
                            value={progress.mm}
                            className="flex-1 h-3 [&>div]:bg-pink-600"
                          />
                          <span className="text-base font-semibold text-pink-600">
                            {progress.mm}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default HomePage;
