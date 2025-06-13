import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { useGetStatistics } from '@/hooks/useStatistics';

const ChartAreaComponent = () => {
  const { data: statistics } = useGetStatistics();
  const data =
    statistics?.data.lecturerGuidance.map((row) => ({
      lecturerName: row.lecturerName.split(' ').slice(0, 2).join(' '),
      guidananceCount: row.guidanceCount,
    })) || [];

  const chartData = [
    { lecturerName: '', guidananceCount: 0 },
    ...data,
    { lecturerName: '', guidananceCount: 16 },
  ];

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Jumlah Bimbingan</CardTitle>
        <CardDescription>
          Menunjukkan area chart data jumlah bimbingan tiap dosen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1F66FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1F66FF" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="lecturerName"
                interval={0}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis />

              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="guidananceCount"
                stroke="#1F66FF"
                fill="url(#gradient)"
                dot={{ r: 6, fill: '#1F66FF' }}
                activeDot={{ r: 7 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartAreaComponent;
