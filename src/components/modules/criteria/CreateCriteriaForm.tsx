import {
  createCriteriaSchema,
  CreateCriteriaSchema,
} from '@/commons/schema/create-criteria.schema';
import { CreateCriteriaProps } from '@/commons/types/criteria/create-criteria-props.type';
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

const CreateCriteriaForm: React.FC<CreateCriteriaProps> = ({ onSuccess }) => {
  const form = useForm<CreateCriteriaSchema>({
    resolver: zodResolver(createCriteriaSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      weight: '',
      type: '',
      subCriteria: [{ name: '', weight: '' }],
    },
  });
  const values: CreateCriteriaSchema = form.watch();
  const isEmpty = (val: number | string | undefined | string[]) => !val;
  const { loading } = useGlobalStore();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subCriteria',
  });

  const onSubmit: SubmitHandler<CreateCriteriaSchema> = (
    data: CreateCriteriaSchema,
  ) => {
    if (onSuccess) {
      onSuccess(data);
    }
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex gap-2 mt-3">
          <div className="w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.name) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Nama Kriteria
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama kriteria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.weight) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Bobot Kriteria
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masukkan bobot kriteria"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.type) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Tipe Kriteria
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tipe kriteria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Benefit">Benefit</SelectItem>
                        <SelectItem value="Cost">Cost</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-end">
              <FormField
                control={form.control}
                name={`subCriteria.${index}.name`}
                render={({ field }) => (
                  <FormItem className={`w-1/2 ${index == 0 && 'mt-2'}`}>
                    <FormLabel>
                      {index == 0 && (
                        <>
                          {values.subCriteria.some((s) => !s.name.trim()) && (
                            <span className="text-red-500">*</span>
                          )}{' '}
                          Nama Sub-Kriteria
                        </>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Sub-Kriteria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`subCriteria.${index}.weight`}
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>
                      {index == 0 && (
                        <div>
                          {values.subCriteria.some((s) => !s.weight) && (
                            <span className="text-red-500">*</span>
                          )}{' '}
                          Bobot Sub-Kriteria
                        </div>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Bobot" {...field} />
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

          <Button
            type="button"
            onClick={() => append({ name: '', weight: '' })}
            className="mt-2 bg-primary-700 hover:bg-blue-600"
          >
            <PlusIcon />
            Tambah
          </Button>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={handleReset}>
            <RotateCcw /> Reset
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save />
                Simpan
              </>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateCriteriaForm;
