import { recommendationColumn } from '@/commons/constants/recommendation/table-column-data.constant';
import DataManagementComponent from '@/components/commons/DataManagementComponent';
import TableComponent from '@/components/commons/TableComponent';

const RecommendationTab = () => {
  return (
    <div>
      <DataManagementComponent
        onClickCreate={() => {}}
        excludeImportExport={true}
        onClickDelete={async () => {
          return true;
        }}
        onSearchChange={() => {}}
        titleDialog="Nomalisasi Matriks"
        isMatriks={true}
      />
      <TableComponent
        data={[]}
        onDelete={async () => {
          return true;
        }}
        columns={recommendationColumn}
        isMatriks={true}
        pathDetail=""
      />
    </div>
  );
};

export default RecommendationTab;
