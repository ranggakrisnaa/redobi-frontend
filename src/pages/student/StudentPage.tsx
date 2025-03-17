import DataManagementComponent from '@/components/commons/DataManagementComponent';
import FilterComponent from '@/components/commons/FilterComponent';
import TableComponent from '@/components/commons/TableComponent';
import DashboardContainer from '@/components/containers/DashboardContainer';

const StudentPage = () => {
  return (
    <DashboardContainer>
      <h1 className="text-2xl font-bold">Mahasiswa</h1>
      <DataManagementComponent />
      <FilterComponent />
      <TableComponent />
    </DashboardContainer>
  );
};

export default StudentPage;
