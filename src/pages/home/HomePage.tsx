import DashboardContainer from '@/components/containers/DashboardContainer';

const HomePage = () => {
  return (
    <div className="w-full h-full">
      <DashboardContainer pageTitle="Dashboard">
        <div></div>
        <div>
          <p>Selamat datang di sistem rekomendasi dosen pembimbing.</p>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default HomePage;
