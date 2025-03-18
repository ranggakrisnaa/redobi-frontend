import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const DataManagementComponent = () => {
  return (
    <div className="flex gap-2 mt-9 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        placeholder="Search"
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
      />
      <Button>Tambah Data</Button>
      <Button>Download Excel</Button>
      <Button>Import Excel</Button>
      <Button>Hapus Data</Button>
    </div>
  );
};

export default DataManagementComponent;
