import { TipePembimbingEnum } from '@/commons/enums/tipe-pembimbing.enum';
import { ILecturer } from '@/commons/interface-model/lecturer-entity.interface';
import { IRecommendation } from '@/commons/interface-model/recommendation-entity.interface';
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
import { usePaginationRecommendations } from '@/hooks/useRecommendation';
import { useRecommendationStore } from '@/store/recommendationStore';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

type RecommendationForm = {
  mahasiswa: {
    nama: string;
    pembimbing1: string;
    pembimbing2: string;
  }[];
};
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
const RecommendationForm = ({ setOpen }: Props) => {
  const { data: listRecommendations } = usePaginationRecommendations();
  const { data: listLecturers } = useLecturerPagination();
  const { setPageSize } = useRecommendationStore();
  const { register, handleSubmit, control, setValue, watch, reset } =
    useForm<RecommendationForm>({
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

  useEffect(() => {
    if (listRecommendations?.data) {
      const mahasiswaMap = new Map<
        string,
        { nama: string; pembimbing1: string; pembimbing2: string }
      >();

      listRecommendations.data.forEach((rec: IRecommendation) => {
        const studentName = rec.student?.fullName || '';
        const lecturerName = rec.lecturer?.fullName || '';

        if (!mahasiswaMap.has(studentName)) {
          mahasiswaMap.set(studentName, {
            nama: studentName,
            pembimbing1: lecturerName,
            pembimbing2: '',
          });
        } else {
          const existing = mahasiswaMap.get(studentName);
          if (existing?.pembimbing1 && existing.pembimbing1 !== lecturerName) {
            existing.pembimbing2 = lecturerName;
            mahasiswaMap.set(studentName, existing);
          }
        }
      });

      const mapped = Array.from(mahasiswaMap.values());
      const lecturer1 =
        listLecturers?.data
          .filter(
            (lecturer: ILecturer) =>
              lecturer.tipePembimbing == TipePembimbingEnum.PEMBIMBING_SATU,
          )
          .map((lecturer: ILecturer) => lecturer.fullName) || [];
      const lecturer2 =
        listLecturers?.data
          .filter(
            (lecturer: ILecturer) =>
              lecturer.tipePembimbing == TipePembimbingEnum.PEMBIMBING_DUA,
          )
          .map((lecturer: ILecturer) => lecturer.fullName) || [];
      setAvailableLecturers({
        pembimbing1: lecturer1,
        pembimbing2: lecturer2,
      });

      reset({ mahasiswa: mapped });
    }
  }, [listRecommendations, reset, listLecturers?.data]);

  const watchedValues = watch();

  const onSubmit = (data: RecommendationForm) => {
    if (data.mahasiswa.length == listRecommendations?.data.length) {
      setOpen(false);
    }
  };

  const handleSelectChange = (index: number, field: string, value: string) => {
    setValue(`mahasiswa.${index}.${field}` as any, value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-3 gap-2 font-semibold border-b pb-2 text-sm">
        <span>Nama Mahasiswa</span>
        <span className="col-span-1">Dosen Pembimbing 1</span>
        <span className="col-span-1">Dosen Pembimbing 2</span>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-3 gap-2 items-center mt-1"
          >
            <Input
              {...register(`mahasiswa.${index}.nama`)}
              disabled
              className="text-sm full"
            />

            <Select
              value={
                watchedValues.mahasiswa?.[index]?.pembimbing1 ||
                field.pembimbing1
              }
              onValueChange={(value) =>
                handleSelectChange(index, 'pembimbing1', value)
              }
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Pilih Dosen" />
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
                field.pembimbing2
              }
              onValueChange={(value) =>
                handleSelectChange(index, 'pembimbing2', value)
              }
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Pilih Dosen" />
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
          onClick={() => {
            setOpen(false);
            setPageSize(10);
          }}
        >
          Batal
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            setPageSize(10);
          }}
        >
          Simpan
        </Button>
      </DialogFooter>
    </form>
  );
};
export default RecommendationForm;
