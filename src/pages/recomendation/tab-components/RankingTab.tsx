import { rankingColumn } from '@/commons/constants/recommendation/table-column-data.constant';
import DataManagementComponent from '@/components/commons/DataManagementComponent';
import TableComponent from '@/components/commons/TableComponent';

const RankingTab = () => {
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
        columns={rankingColumn}
        onDelete={async () => {
          return true;
        }}
        isMatriks={true}
        pathDetail=""
      />
    </div>
  );
};

export default RankingTab;
