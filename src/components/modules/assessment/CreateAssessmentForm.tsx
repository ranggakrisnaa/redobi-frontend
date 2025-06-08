import { ISubCriteria } from '@/commons/interface-model/sub-criteria-entity.entity';
import {
  createAssessmentSchema,
  CreateAssessmentSchema,
} from '@/commons/schema/create-assessment.schema';
import { CreateAssessmentProps } from '@/commons/types/assessment/create-assessment-props.type';
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
import { useCriteriaPagination } from '@/hooks/useCriteria';
import { useLecturerPagination } from '@/hooks/useLecturer';
import { useAssessmentStore } from '@/store/assessmentStore';
import { useGlobalStore } from '@/store/globalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, PlusIcon, RotateCcw, Save } from 'lucide-react';
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
  const { data: lecturerData } = useLecturerPagination();
  const { data: criteriaData } = useCriteriaPagination();
  const { selectedCriteria, setSelectedCriteria, resetSelectedCriteria } =
    useAssessmentStore();
  const { loading } = useGlobalStore();

  useEffect(() => {
    setSelectedCriteria(['']);
  }, [setSelectedCriteria]);

  const form = useForm<CreateAssessmentSchema>({
    resolver: zodResolver(createAssessmentSchema),
    mode: 'onChange',
    defaultValues: {
      lecturerId: '',
      scores: [
        {
          criteriaName: '',
          subCriteria: [],
          subScores: [],
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'scores',
  });

  const handleCriteriaChange = (criteriaName: string, index: number) => {
    if (!criteriaData?.data) return;

    const selectedCriteriaItem = criteriaData.data.find(
      (criteria) => criteria.name === criteriaName,
    );

    if (!selectedCriteriaItem) return;

    const subCriteria = selectedCriteriaItem?.subCriteria?.map(
      (sub: ISubCriteria) => ({
        id: sub.id,
        name: sub.name,
      }),
    ) as unknown as { id: string; name: string }[];
    const subScores = subCriteria?.map((sub: any) => ({
      subCriteriaId: sub.id,
      score: '',
    }));

    form.setValue(`scores.${index}.criteriaName`, criteriaName);
    form.setValue(`scores.${index}.subCriteria`, subCriteria);
    form.setValue(`scores.${index}.subScores`, subScores);

    setSelectedCriteria(criteriaName);
  };

  const onSubmit: SubmitHandler<CreateAssessmentSchema> = (
    data: CreateAssessmentSchema,
  ) => {
    const totalCriteriaCount = criteriaData?.data?.length ?? 0;

    const filledCriteriaCount = data.scores.filter(
      (score) => score.criteriaName && score.criteriaName.trim() !== '',
    ).length;

    if (filledCriteriaCount !== totalCriteriaCount) {
      form.setError('scores', {
        type: 'manual',
        message: `Harap masukkan semua kriteria. Total kriteria harus ${totalCriteriaCount}.`,
      });
      return;
    }

    const payload = {
      lecturerId: data.lecturerId,
      scores: data.scores.flatMap((score) =>
        score.subScores.map((subScore) => ({
          subCriteriaId: Number(subScore.subCriteriaId),
          score: Number(subScore.score),
        })),
      ),
    };

    if (onSuccess) {
      onSuccess(payload as unknown as CreateAssessmentSchema);
    }
  };

  const isAnyEmptyCriteria = form
    .watch('scores')
    .some((score) => !score.criteriaName);

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
                  <FormLabel>Nama Dosen</FormLabel>
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
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="w-full space-y-3 border p-3 rounded-md"
          >
            <div className="flex items-center gap-2">
              <div className="flex-1">
                {form.watch(`scores.${index}.criteriaName`) ? (
                  <div>
                    <FormLabel>Kriteria</FormLabel>
                    <Input
                      value={form.watch(`scores.${index}.criteriaName`)}
                      disabled
                    />
                  </div>
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name={`scores.${index}.criteriaName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pilih Kriteria</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleCriteriaChange(value, index);
                            }}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih Kriteria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {criteriaData?.data
                                .filter(
                                  (data) =>
                                    !selectedCriteria.some(
                                      (selected) => selected === data.name,
                                    ),
                                )
                                .map((criteria) => (
                                  <SelectItem
                                    key={criteria.id}
                                    value={criteria.name}
                                  >
                                    {criteria.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            </div>
            {form.watch('scores')[index]?.subCriteria?.map((sub, subIndex) => (
              <div key={sub.id} className="flex items-center gap-4">
                <div className="w-1/2 space-y-2">
                  <FormLabel>{`Sub-Kriteria ${subIndex + 1}`}</FormLabel>
                  <Input value={sub.name} disabled />
                </div>
                <div className="w-1/2 space-y-2">
                  <FormField
                    control={form.control}
                    name={`scores.${index}.subScores.${subIndex}.score`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skor</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            placeholder="0-100"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <input
                    type="hidden"
                    {...form.register(
                      `scores.${index}.subScores.${subIndex}.subCriteriaId`,
                    )}
                    value={sub.id}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}

        {form.formState.errors.scores?.message && (
          <p className="text-sm text-red-600 font-medium mt-2">
            {form.formState.errors.scores.message}
          </p>
        )}
        <Button
          type="button"
          onClick={() =>
            append({
              criteriaName: '',
              subCriteria: [],
              subScores: [],
            })
          }
          disabled={
            isAnyEmptyCriteria ||
            fields.length >= (criteriaData?.data.length ?? 0)
          }
          className="mt-2 bg-primary-700 hover:bg-blue-600"
        >
          <PlusIcon className="mr-2" size={16} />
          Tambah Kriteria
        </Button>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              resetSelectedCriteria();
            }}
          >
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

export default CreateAssessmentForm;
