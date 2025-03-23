import DashboardContainer from '@/components/containers/DashboardContainer';

const HomePage = () => {
  return (
    <div className="w-full h-full">
      <DashboardContainer>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Selamat datang di sistem rekomendasi dosen pembimbing.</p>
      </DashboardContainer>
    </div>
  );
};

export default HomePage;
