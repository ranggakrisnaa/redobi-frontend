import { ISubCriteria } from '@/commons/interface-model/sub-criteria-entity.entity';
import {
  UpdateAssessmentSchema,
  updateAssessmentSchema,
} from '@/commons/schema/update-assessment.schema';
import { UpdateAssessmentProps } from '@/commons/types/assessment/update-assessment-props.type';
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
import { useAssessmentStore } from '@/store/assessmentStore';
import { useGlobalStore } from '@/store/globalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, PlusIcon, RotateCcw, Save } from 'lucide-react';
import React, { useEffect, useMemo } from 'react';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';

const UpdateAssessmentForm: React.FC<UpdateAssessmentProps> = ({
  onSuccess,
  data,
}) => {
  const { data: criteriaData } = useCriteriaPagination();
  const { loading } = useGlobalStore();
  const { selectedCriteria, setSelectedCriteria, resetSelectedCriteria } =
    useAssessmentStore();
  const form = useForm<UpdateAssessmentSchema>({
    resolver: zodResolver(updateAssessmentSchema),
    mode: 'onChange',
    defaultValues: {
      lecturerId: data.lecturerId ?? '',
      scores: (() => {
        const grouped: Record<
          string,
          {
            criteriaName: string;
            assessmentSubCriteriaId: string;
            subCriteria: { id: string; name: string }[];
            subScores: { subCriteriaId: string; score: string }[];
          }
        > = {};

        data.assessmentSubCriteria?.forEach((subCriteria) => {
          const criteriaName = subCriteria?.subCriteria?.criteria?.name ?? '';
          const subCriteriaId = subCriteria?.subCriteria?.id?.toString() ?? '';
          const subCriteriaName = subCriteria?.subCriteria?.name ?? '';
          const score = subCriteria.score?.toString() ?? '';
          const assessmentSubCriteriaId = subCriteria.id.toString();

          if (!grouped[criteriaName]) {
            grouped[criteriaName] = {
              criteriaName,
              assessmentSubCriteriaId,
              subCriteria: [],
              subScores: [],
            };
          }

          grouped[criteriaName].assessmentSubCriteriaId =
            assessmentSubCriteriaId;
          grouped[criteriaName].subCriteria.push({
            id: subCriteriaId,
            name: subCriteriaName,
          });

          grouped[criteriaName].subScores.push({
            subCriteriaId,
            score,
          });
        });

        return Object.values(grouped);
      })(),
    },
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

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'scores',
  });

  const criteriaNames = useMemo(() => {
    if (!data?.assessmentSubCriteria?.length) return [];
    return Array.from(
      new Set(
        data.assessmentSubCriteria
          .map((item) => item?.subCriteria?.criteria?.name)
          .filter(Boolean),
      ),
    ) as string[];
  }, [data?.assessmentSubCriteria]);

  useEffect(() => {
    if (criteriaNames.length > 0) {
      setSelectedCriteria(criteriaNames);
    }

    return () => {
      resetSelectedCriteria();
    };
  }, [criteriaNames, setSelectedCriteria, resetSelectedCriteria]);

  const onSubmit: SubmitHandler<UpdateAssessmentSchema> = (
    data: UpdateAssessmentSchema,
  ) => {
    const payload = {
      lecturerId: data.lecturerId,
      scores: data?.scores?.flatMap((score) =>
        score?.subScores?.map((subScore) => ({
          assessmentSubCriteriaId: score.assessmentSubCriteriaId,
          subCriteriaId: Number(subScore?.subCriteriaId),
          score: Number(subScore?.score),
        })),
      ),
    };

    console.log(payload);

    if (onSuccess) {
      onSuccess(payload as UpdateAssessmentSchema);
    }
  };

  const isAnyEmptyCriteria = form
    ?.watch('scores')
    ?.some((score) => !score.criteriaName);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex gap-2 mt-3">
          <div className="w-full">
            <FormField
              control={form.control}
              name="lecturerId"
              render={() => (
                <FormItem>
                  <FormLabel>Nama Dosen</FormLabel>
                  <FormControl>
                    <Input value={data?.lecturer?.fullName} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="gap-2 mt-3">
          <div className="w-full">
            {fields.map((fieldData, index) => (
              <div
                className="mb-2 w-full space-y-3 border p-3 rounded-md"
                key={index}
              >
                {form.watch(`scores.${index}.criteriaName`) ? (
                  <FormField
                    control={form.control}
                    name={`scores.${index}.criteriaName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kriteria {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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

                {fieldData.subScores?.map((_: any, subIndex: number) => (
                  <div className="flex gap-2 mt-3" key={subIndex}>
                    <div className="w-1/2">
                      <FormField
                        key={subIndex}
                        control={form.control}
                        name={`scores.${index}.subCriteria.${subIndex}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sub Kriteria {subIndex + 1}</FormLabel>
                            <FormControl>
                              <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-1/2">
                      <FormField
                        key={subIndex}
                        control={form.control}
                        name={`scores.${index}.subScores.${subIndex}.score`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Nilai Sub Kriteria {subIndex + 1}
                            </FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
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
                assessmentSubCriteriaId: '',
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
        </div>

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

export default UpdateAssessmentForm;
