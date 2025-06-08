import hello from '@/assets/images/hello.png';
import ChartAreaComponent from '@/components/commons/ChartAreaComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, BookOpen, Target, Users } from 'lucide-react';

const HomePage = () => {
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
            {/* Progress Cards */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="mt-3">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-sm text-gray-600 mb-2">
                      Mahasiswa yang telah mendapat dosen pembimbing
                    </h3>
                    <div className="flex items-center gap-3 justify-center">
                      <Progress value={64} className="h-3" />
                      <p className="text-right text-md font-semibold">64%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        54
                      </div>
                      <p className="text-sm text-gray-600">
                        Mahasiswa Sudah Mendapat Dosen Pembimbing
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-red-600 mb-1">
                        36
                      </div>
                      <p className="text-sm text-gray-600">
                        Mahasiswa Sudah Mendapat Dosen Pembimbing
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
                    <p className="text-2xl font-bold text-gray-900">234</p>
                  </CardContent>
                </Card>

                <Card className="bg-green-50">
                  <CardContent className="p-4 text-center">
                    <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">Jumlah Dosen</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50">
                  <CardContent className="p-4 text-center">
                    <Award className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">
                      Jumlah Kriteria
                    </p>
                    <p className="text-2xl font-bold text-gray-900">6</p>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50">
                  <CardContent className="p-4 text-center">
                    <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">
                      Jumlah Sub-Kriteria
                    </p>
                    <p className="text-2xl font-bold text-gray-900">21</p>
                  </CardContent>
                </Card>
              </div>
              <ChartAreaComponent />
            </div>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default HomePage;
