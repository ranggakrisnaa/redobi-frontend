import {
  createAsessmentSchema,
  CreateAssessmentSchema,
} from '@/commons/schema/create-assessment.schema';
import { CreateAssessmentProps } from '@/commons/types/assessment/create-assessment-props.type';
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
import { useCriteriaPagination } from '@/hooks/useCriteria';
import { useLecturerPagination } from '@/hooks/useLecturer';
import { useCriteriaStore } from '@/store/criteriaStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';

const CreateAssessmentForm: React.FC<CreateAssessmentProps> = ({
  onSuccess,
}) => {
  const { setSubCriteriaData, subCriteriaData } = useCriteriaStore();
  const { data: lecturerData } = useLecturerPagination();
  const { data: criteriaData } = useCriteriaPagination();
  const form = useForm<CreateAssessmentSchema>({
    resolver: zodResolver(createAsessmentSchema),
    mode: 'onChange',
    defaultValues: {
      lecturerId: '',
      // scores: [{ criteriaName: '', score: '', subCriteriaId: '' }],
      scores: subCriteriaData?.map((sub) => ({
        criteriaName: '',
        score: '0',
        subCriteriaId: sub.id.toString(),
      })),
    },
  });
  const values: CreateAssessmentSchema = form.watch();
  const { fields } = useFieldArray({
    control: form.control,
    name: 'scores',
  });

  useEffect(() => {
    if (!criteriaData?.data) return;

    const validCriteriaNames = values.scores
      .map((score) => score.criteriaName)
      .filter((name) => name && name.trim() !== '');

    if (validCriteriaNames.length === 0) {
      setSubCriteriaData([]);
      return;
    }

    const selectedCriteria = criteriaData.data.filter((criteria) =>
      validCriteriaNames.includes(criteria.name),
    );

    const allSubCriteria = selectedCriteria.flatMap(
      (criteria) => criteria.subCriteria,
    );

    setSubCriteriaData(allSubCriteria);
  }, [criteriaData?.data, values.scores, setSubCriteriaData]);

  const isEmpty = (val: number | string | undefined | string[]) => !val;
  const onSubmit: SubmitHandler<CreateAssessmentSchema> = (
    data: CreateAssessmentSchema,
  ) => {
    if (onSuccess) {
      onSuccess(data);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex gap-2 mt-3">
          <div className="w-full">
            <FormField
              control={form.control}
              name="lecturerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.lecturerId) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Nama Dosen
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Nama Dosen" />
                      </SelectTrigger>
                      <SelectContent>
                        {lecturerData?.data?.map((lecturer) => (
                          <SelectItem value={lecturer.id} key={lecturer.id}>
                            {lecturer.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full">
          {fields.map((field, index) => (
            <div key={field.id}>
              <FormField
                control={form.control}
                name={`scores.${index}.criteriaName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {values.scores.some(
                        (criteria) => !criteria.criteriaName.trim(),
                      ) && <span className="text-red-500">*</span>}{' '}
                      Nama Kriteria
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Nama Kriteria" />
                        </SelectTrigger>
                        <SelectContent>
                          {criteriaData?.data?.map((criteria) => (
                            <SelectItem value={criteria.name} key={criteria.id}>
                              {criteria.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`scores.${index}.subCriteriaId`}
                render={({ field }) => (
                  <FormItem className={`w-1/2 ${index == 0 && 'mt-2'}`}>
                    <FormLabel>
                      {index == 0 && (
                        <>
                          {values.scores?.some(
                            (s) => !s.subCriteriaId?.trim(),
                          ) && <span className="text-red-500">*</span>}{' '}
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
            </div>
          ))}
        </div>
      </form>
    </FormProvider>
  );
};
export default CreateAssessmentForm;
