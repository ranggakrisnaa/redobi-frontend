import { FormControl, FormField } from '@/components/ui/form';
import { FileDown, Plus, Search, Trash2, Upload } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type DataManagementComponentProps = {
  onSearchChange: (value: string) => void;
};

const DataManagementComponent: React.FC<DataManagementComponentProps> = ({
  onSearchChange,
}) => {
  const form = useForm({
    defaultValues: {
      search: '',
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      onSearchChange(value.search as string);
    });

    return () => subscription.unsubscribe();
  }, [form, form.watch, onSearchChange]);

  return (
    <FormProvider {...form}>
      <div className="flex gap-2 mt-9 relative">
        <form className="flex items-center w-full">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormControl>
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    {...field}
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
                  />
                </div>
              </FormControl>
            )}
          />
        </form>
        <Button className="bg-primary-500">
          <Plus className="w-4 h-4 mr-1" /> Tambah Data
        </Button>
        <Button className="bg-success-500">
          <FileDown className="w-4 h-4 mr-1" /> Download Excel
        </Button>
        <Button className="bg-warning-900">
          <Upload className="w-4 h-4 mr-1" /> Import Excel
        </Button>
        <Button className="bg-error-500">
          <Trash2 className="w-4 h-4 mr-1" /> Hapus Data
        </Button>
      </div>
    </FormProvider>
  );
};

export default DataManagementComponent;
