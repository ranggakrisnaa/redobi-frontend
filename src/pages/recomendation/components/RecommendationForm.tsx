import { TipePembimbingEnum } from '@/commons/enums/tipe-pembimbing.enum';
import { ILecturer } from '@/commons/interface-model/lecturer-entity.interface';
import { IRecommendation } from '@/commons/interface-model/recommendation-entity.interface';
import { RecommendationFormSchema } from '@/commons/schema/update-recommendation.schema';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLecturerPagination } from '@/hooks/useLecturer';
import {
  useDeleteRecommendation,
  usePaginationRecommendations,
} from '@/hooks/useRecommendation';
import { useRecommendationStore } from '@/store/recommendationStore';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

type Props = {
  onSuccess: (data: RecommendationFormSchema) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const RecommendationFormPage: React.FC<Props> = ({
  setOpen,
  onSuccess,
  open,
}) => {
  const { data: listRecommendations, isLoading: isLoadingRecommendations } =
    usePaginationRecommendations();
  const { data: listLecturers, isLoading: isLoadingLecturers } =
    useLecturerPagination();
  const { setPageSize } = useRecommendationStore();
  const { mutate: deleteRecommendation } = useDeleteRecommendation();

  const { register, handleSubmit, control, setValue, watch, reset } =
    useForm<RecommendationFormSchema>({
      defaultValues: {
        mahasiswa: [],
      },
    });

  const { fields } = useFieldArray({
    control,
    name: 'mahasiswa',
  });

  const [availableLecturers, setAvailableLecturers] = useState<{
    pembimbing1: string[];
    pembimbing2: string[];
  }>({ pembimbing1: [], pembimbing2: [] });

  const [isDataProcessed, setIsDataProcessed] = useState(false);

  useEffect(() => {
    if (
      !isLoadingRecommendations &&
      !isLoadingLecturers &&
      listRecommendations?.data?.length &&
      listLecturers?.data?.length &&
      !isDataProcessed
    ) {
      const mahasiswaMap = new Map<
        string,
        { nama: string; pembimbing1: string; pembimbing2: string }
      >();

      listRecommendations.data.forEach((rec: IRecommendation) => {
        const studentName = rec.student?.fullName || '';
        const lecturerName = rec.lecturer?.fullName || '';

        console.log(
          `Processing student: ${studentName}, lecturer: ${lecturerName}`,
        );

        if (studentName && lecturerName) {
          if (!mahasiswaMap.has(studentName)) {
            mahasiswaMap.set(studentName, {
              nama: studentName,
              pembimbing1:
                rec.lecturer?.tipePembimbing ===
                TipePembimbingEnum.PEMBIMBING_SATU
                  ? lecturerName
                  : '',
              pembimbing2:
                rec.lecturer?.tipePembimbing ===
                TipePembimbingEnum.PEMBIMBING_DUA
                  ? lecturerName
                  : '',
            });
          } else {
            const existing = mahasiswaMap.get(studentName);
            if (existing) {
              if (
                rec.lecturer?.tipePembimbing ===
                TipePembimbingEnum.PEMBIMBING_SATU
              ) {
                existing.pembimbing1 = lecturerName;
              } else if (
                rec.lecturer?.tipePembimbing ===
                TipePembimbingEnum.PEMBIMBING_DUA
              ) {
                existing.pembimbing2 = lecturerName;
              }
              mahasiswaMap.set(studentName, existing);
            }
          }
        }
      });

      const mapped = Array.from(mahasiswaMap.values());
      console.log('Mapped mahasiswa:', mapped);

      const lecturer1 = listLecturers.data
        .filter(
          (lecturer: ILecturer) =>
            lecturer.tipePembimbing === TipePembimbingEnum.PEMBIMBING_SATU,
        )
        .map((lecturer: ILecturer) => lecturer.fullName);

      const lecturer2 = listLecturers.data
        .filter(
          (lecturer: ILecturer) =>
            lecturer.tipePembimbing === TipePembimbingEnum.PEMBIMBING_DUA,
        )
        .map((lecturer: ILecturer) => lecturer.fullName);

      console.log('Available lecturers 1:', lecturer1);
      console.log('Available lecturers 2:', lecturer2);

      setAvailableLecturers({
        pembimbing1: lecturer1,
        pembimbing2: lecturer2,
      });

      reset({ mahasiswa: mapped });
      setIsDataProcessed(true);
    }
  }, [
    listRecommendations,
    listLecturers,
    isLoadingRecommendations,
    isLoadingLecturers,
    reset,
    isDataProcessed,
  ]);

  useEffect(() => {
    if (open) {
      setIsDataProcessed(false);
    }
  }, [open]);

  const watchedValues = watch();

  const onSubmit = (data: RecommendationFormSchema) => {
    if (!listRecommendations?.data || !listLecturers?.data) return;

    const recommendationIds: string[] = [];
    const studentIds: string[] = [];
    const lecturers: {
      lecturerId: string;
      positions: TipePembimbingEnum;
    }[] = [];

    data.mahasiswa.forEach((entry) => {
      const matchedRecs = listRecommendations.data.filter(
        (rec) => rec.student?.fullName === entry.nama,
      );

      const pembimbing1 = listLecturers.data.find(
        (lect) => lect.fullName === entry.pembimbing1,
      );
      const pembimbing2 = listLecturers.data.find(
        (lect) => lect.fullName === entry.pembimbing2,
      );

      if (pembimbing1) {
        const rec1 = matchedRecs.find(
          (r) =>
            r.lecturer?.tipePembimbing === TipePembimbingEnum.PEMBIMBING_SATU,
        );

        lecturers.push({
          lecturerId: pembimbing1.id,
          positions: TipePembimbingEnum.PEMBIMBING_SATU,
        });

        if (rec1?.id) {
          recommendationIds.push(rec1.id);
          studentIds.push(rec1.studentId);
        } else {
          studentIds.push(matchedRecs[0]?.studentId);
        }
      }

      if (pembimbing2) {
        const rec2 = matchedRecs.find(
          (r) =>
            r.lecturer?.tipePembimbing === TipePembimbingEnum.PEMBIMBING_DUA,
        );

        lecturers.push({
          lecturerId: pembimbing2.id,
          positions: TipePembimbingEnum.PEMBIMBING_DUA,
        });
        if (rec2?.id) {
          recommendationIds.push(rec2.id);
          studentIds.push(rec2.studentId);
        } else {
          studentIds.push(matchedRecs[0]?.studentId);
        }
      }
    });

    const payload = {
      recommendationIds,
      studentIds,
      lecturers,
    };

    console.log(payload);

    if (onSuccess) {
      onSuccess(payload as unknown as RecommendationFormSchema);
    }

    setPageSize(10);
    setOpen(false);
  };

  const handleSelectChange = (index: number, field: string, value: string) => {
    setValue(`mahasiswa.${index}.${field}` as any, value);
  };

  if (isLoadingRecommendations || isLoadingLecturers) {
    return (
      <div className="flex justify-center items-center p-8">
        <div>Loading data...</div>
      </div>
    );
  }

  if (!listRecommendations?.data?.length || !listLecturers?.data?.length) {
    return (
      <div className="flex justify-center items-center p-8">
        <div>No data available</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-3 gap-2 font-semibold border-b pb-2 text-sm">
        <span>Nama Mahasiswa</span>
        <span className="col-span-1">Dosen Pembimbing 1</span>
        <span className="col-span-1">Dosen Pembimbing 2</span>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2">
        {fields.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            Tidak ada data mahasiswa
          </div>
        )}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-3 gap-2 items-center mt-1"
          >
            <Input
              {...register(`mahasiswa.${index}.nama`)}
              disabled
              className="text-sm full"
              placeholder="Nama mahasiswa"
            />

            <Select
              value={
                watchedValues.mahasiswa?.[index]?.pembimbing1 ||
                field.pembimbing1 ||
                ''
              }
              onValueChange={(value) =>
                handleSelectChange(index, 'pembimbing1', value)
              }
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Pilih Dosen Pembimbing 1" />
              </SelectTrigger>
              <SelectContent>
                {availableLecturers.pembimbing1.map((lecturer: string) => (
                  <SelectItem key={lecturer} value={lecturer}>
                    {lecturer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={
                watchedValues.mahasiswa?.[index]?.pembimbing2 ||
                field.pembimbing2 ||
                ''
              }
              onValueChange={(value) =>
                handleSelectChange(index, 'pembimbing2', value)
              }
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Pilih Dosen Pembimbing 2" />
              </SelectTrigger>
              <SelectContent>
                {availableLecturers.pembimbing2.map((lecturer: string) => (
                  <SelectItem key={lecturer} value={lecturer}>
                    {lecturer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <DialogFooter className="mt-4 flex-shrink-0">
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteRecommendation([]);
            setIsDataProcessed(false);
            setOpen(false);
            setPageSize(10);
          }}
        >
          Batal
        </Button>
        <Button type="submit" disabled={fields.length === 0}>
          Simpan
        </Button>
      </DialogFooter>
    </form>
  );
};

export default RecommendationFormPage;
