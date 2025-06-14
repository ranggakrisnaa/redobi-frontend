import CustomTabs from '@/components/commons/CustomTabComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { BarChart3, Repeat2, Settings, Slash } from 'lucide-react';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NormalizationTab from './tab-components/NormalizationTab';
import RankingTab from './tab-components/RankingTab';
import RecommendationTab from './tab-components/RecomnendationTab';

const RecommendationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('normalisasi');
  const currentPath = location.pathname;
  const detailRef = useRef<HTMLDivElement>(null);
  useScrollToTopOnPush(detailRef, []);

  const tabs = [
    {
      label: 'Normalisasi Matriks',
      value: 'normalisasi',
      icon: <Repeat2 className="w-4 h-4" />,
      component: <NormalizationTab />,
    },
    {
      label: 'Ranking Matriks',
      value: 'ranking',
      icon: <BarChart3 className="w-4 h-4" />,
      component: <RankingTab />,
    },
    {
      label: 'Hasil Rekomendasi',
      value: 'hasil',
      icon: <Settings className="w-4 h-4" />,
      component: <RecommendationTab />,
    },
  ];

  return (
    <div>
      <DashboardContainer pageTitle="Hasil Rekomendasi">
        <BreadcrumbList>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/recomendations')}
              className={
                currentPath == '/recomendations'
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Hasil Rekomendasi
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
        <div>
          <CustomTabs
            tabs={tabs}
            value={activeTab}
            onValueChange={setActiveTab}
          />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default RecommendationPage;
