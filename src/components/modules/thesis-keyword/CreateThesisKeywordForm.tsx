import { filterOptions } from '@/commons/constants/student/filter-option-student.constant';
import {
  createThesisKeywordSchema,
  CreateThesisKeywordSchema,
} from '@/commons/schema/create-thesis-keyword.schema';
import { CreateThesisKeywordProps } from '@/commons/types/thesis-keyword/create-thesis-keyword-props.type';
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
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';

const CreateThesisKeywordForm: React.FC<CreateThesisKeywordProps> = ({
  onSuccess,
}) => {
  const { loading } = useGlobalStore();
  const { error, setError } = useGlobalStore();
  const form = useForm<CreateThesisKeywordSchema>({
    resolver: zodResolver(createThesisKeywordSchema),
    defaultValues: {
      category: '',
      keywords: [{ name: '' }],
    },
  });
  const values = form.watch();
  const isEmpty = (val: number | string | undefined | string[]) => !val;
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'keywords',
  });

  const onSubmit: SubmitHandler<CreateThesisKeywordSchema> = (data) => {
    const filteredData = {
      category: data.category,
      names: data.keywords
        .filter((keyword) => keyword.name.trim() !== '')
        .map((keyword) => keyword.name.trim()),
    };

    if (onSuccess) {
      onSuccess(filteredData as unknown as CreateThesisKeywordSchema);
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
                    <SelectValue placeholder="Pilih Judul Skripsi" />
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
                          {values.keywords.some((k) => !k.name.trim()) && (
                            <span className="text-red-500">*</span>
                          )}{' '}
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

export default CreateThesisKeywordForm;
