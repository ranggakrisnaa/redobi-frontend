import { normalizationColumn } from '@/commons/constants/recommendation/table-column-data.constant';
import DataManagementComponent from '@/components/commons/DataManagementComponent';
import TableComponent from '@/components/commons/TableComponent';

const NormalizationTab = () => {
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
        columns={normalizationColumn}
        onDelete={async () => {
          return true;
        }}
        isMatriks={true}
        pathDetail=""
      />
    </div>
  );
};

export default NormalizationTab;
