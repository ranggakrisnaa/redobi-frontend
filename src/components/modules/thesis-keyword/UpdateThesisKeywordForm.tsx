import { filterOptions } from '@/commons/constants/student/filter-option-student.constant';
import { IKeyword } from '@/commons/interface-model/keyword-entity.interface';
import {
  UpdateThesisKeywordSchema,
  updateThesisKeywordSchema,
} from '@/commons/schema/update-thesis-keyword.schema';
import { UpdateThesisKeywordProps } from '@/commons/types/thesis-keyword/update-thesis-keyword-props.type';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGlobalStore } from '@/store/globalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, PlusIcon, RotateCcw, Save, Trash2 } from 'lucide-react';
import React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

const UpdateThesisKeywordForm: React.FC<UpdateThesisKeywordProps> = ({
  onSuccess,
  data,
}) => {
  const form = useForm<UpdateThesisKeywordSchema>({
    resolver: zodResolver(updateThesisKeywordSchema),
    mode: 'onChange',
    defaultValues: {
      category: data.category ?? '',
      keywords: data.keyword?.map((keyword: IKeyword) => ({
        name: keyword.name,
      })),
    },
  });
  const { error, setError } = useGlobalStore();
  const { loading } = useGlobalStore();
  const values = form.watch();
  const isEmpty = (val: number | string | undefined | string[]) => !val;
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'keywords',
  });
  const onSubmit = (data: UpdateThesisKeywordSchema) => {
    const filteredData = {
      category: data.category,
      names: data.keywords
        ?.filter((keyword) => keyword.name && keyword?.name.trim() !== '')
        .map((keyword) => keyword.name && keyword?.name.trim()),
    };

    if (onSuccess) {
      onSuccess(filteredData);
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className={`${!error && 'mt-3'}`}>
              <FormLabel>
                {isEmpty(values.category) && (
                  <span className="text-red-500">*</span>
                )}{' '}
                Kategori Judul Skripsi
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jurusan" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions?.jurusan?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    )) || (
                      <SelectItem value="" disabled>
                        Data tidak tersedia
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-end">
              <FormField
                control={form.control}
                name={`keywords.${index}.name`}
                render={({ field }) => (
                  <FormItem className={`w-full ${index === 0 ? 'mt-2' : ''}`}>
                    <FormLabel>
                      {index === 0 && (
                        <>
                          {values?.keywords?.some(
                            (k) => k && k.name && !k.name.trim(),
                          ) && <span className="text-red-500">*</span>}{' '}
                          Nama Keyword
                        </>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Keyword" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  className="h-fit"
                  onClick={() => remove(index)}
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={() => append({ name: '' })}
          className="mt-2 bg-primary-700 hover:bg-blue-600"
        >
          <PlusIcon />
          Tambah
        </Button>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setError(null);
            }}
            disabled={loading}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan
              </>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateThesisKeywordForm;
