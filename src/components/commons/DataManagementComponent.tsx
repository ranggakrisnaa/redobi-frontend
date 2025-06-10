import { FormControl, FormField } from '@/components/ui/form';
import { useGlobalStore } from '@/store/globalStore';
import { FileDown, Plus, RefreshCcwDot, Search, X } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import DeleteConfirmationComponent from './DeleteConfirmationComponent';
import ImportDrawerComponent from './ImportDialogComponent';

type DataManagementComponentProps = {
  onSearchChange: (value: string) => void;
  onClickCreate: () => void;
  onClickDelete: () => Promise<boolean>;
  onClickDownload?: () => void;
  onClickImport?: (file: File) => Promise<boolean>;
  titleDialog: string;
  excludeImportExport?: boolean;
  isMatriks?: boolean;
};

const DataManagementComponent: React.FC<DataManagementComponentProps> = ({
  onSearchChange,
  onClickCreate,
  onClickDownload,
  onClickDelete,
  onClickImport,
  titleDialog,
  excludeImportExport,
  isMatriks,
}) => {
  const { setIsSearch } = useGlobalStore();
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
      <div className="flex gap-2 mt-6 relative">
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
                  {field.value && (
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue('search', '');
                        setIsSearch(null);
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X />
                    </button>
                  )}
                </div>
              </FormControl>
            )}
          />
        </form>
        {!isMatriks && (
          <Button
            className="bg-primary-500 hover:bg-blue-500 transition-all duration-200"
            onClick={onClickCreate}
          >
            <Plus className="w-4 h-4 mr-1" /> Tambah Data
          </Button>
        )}
        {isMatriks && (
          <Button className="bg-[#166534] hover:bg-[#16A34A] transition-all duration-200">
            <RefreshCcwDot className="w-4 h-4 mr-1" /> Perbarui Data
          </Button>
        )}
        {!excludeImportExport && (
          <>
            <Button
              className="bg-success-500 hover:bg-[#13B14E] transition-all duration-200"
              onClick={onClickDownload}
            >
              <FileDown className="w-4 h-4 mr-1" /> Download Excel
            </Button>
            <ImportDrawerComponent
              onImport={onClickImport}
              titleDialog={titleDialog}
            />
          </>
        )}

        <DeleteConfirmationComponent
          onConfirm={onClickDelete}
          isSingle={false}
        />
      </div>
    </FormProvider>
  );
};

export default DataManagementComponent;
