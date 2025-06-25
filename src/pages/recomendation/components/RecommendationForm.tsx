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
import { usePaginationRecommendations } from '@/hooks/useRecommendation';
import { useRecommendationStore } from '@/store/recommendationStore';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

type Props = {
  onSuccess: (data: RecommendationFormSchema) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

// Loading Progress Component
const LoadingProgress = ({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) => {
  const progress = (step / totalSteps) * 100;

  const loadingSteps = [
    { label: 'Memuat data rekomendasi...', icon: '📋' },
    { label: 'Memuat daftar dosen...', icon: '👨‍🏫' },
    { label: 'Memproses data mahasiswa...', icon: '👨‍🎓' },
    { label: 'Menyiapkan formulir...', icon: '✨' },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      {/* Animated Icon */}
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-2xl animate-bounce">
            {loadingSteps[Math.min(step - 1, loadingSteps.length - 1)]?.icon ||
              '⏳'}
          </span>
        </div>
        {/* Spinning ring */}
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            {loadingSteps[Math.min(step - 1, loadingSteps.length - 1)]?.label ||
              'Memuat...'}
          </span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Loading dots */}
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>

      {/* Step indicators */}
      <div className="flex space-x-2 mt-4">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i < step
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-110'
                : i === step
                  ? 'bg-blue-300 animate-pulse'
                  : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

// // Alternative Skeleton Loading Component
// const SkeletonLoading = () => {
//   return (
//     <div className="space-y-4 p-4">
//       {/* Header skeleton */}
//       <div className="grid grid-cols-3 gap-2 pb-2">
//         {[...Array(3)].map((_, i) => (
//           <div
//             key={i}
//             className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"
//           ></div>
//         ))}
//       </div>
//
//       {/* Row skeletons */}
//       <div className="space-y-3">
//         {[...Array(5)].map((_, i) => (
//           <div key={i} className="grid grid-cols-3 gap-2 items-center">
//             <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
//             <div
//               className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"
//               style={{ animationDelay: '0.1s' }}
//             ></div>
//             <div
//               className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"
//               style={{ animationDelay: '0.2s' }}
//             ></div>
//           </div>
//         ))}
//       </div>
//
//       {/* Footer skeleton */}
//       <div className="flex justify-end space-x-2 mt-4">
//         <div className="h-10 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
//         <div
//           className="h-10 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"
//           style={{ animationDelay: '0.1s' }}
//         ></div>
//       </div>
//     </div>
//   );
// };

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
  const [loadingStep, setLoadingStep] = useState(1);

  // Simulate loading steps for better UX
  useEffect(() => {
    if (isLoadingRecommendations || isLoadingLecturers) {
      const timer = setInterval(() => {
        setLoadingStep((prev) => {
          if (!isLoadingRecommendations && prev === 1) return 2;
          if (!isLoadingLecturers && prev === 2) return 3;
          if (prev === 3) return 4;
          return prev;
        });
      }, 800);

      return () => clearInterval(timer);
    }
  }, [isLoadingRecommendations, isLoadingLecturers]);

  useEffect(() => {
    if (
      !isLoadingRecommendations &&
      !isLoadingLecturers &&
      listRecommendations?.data?.length &&
      listLecturers?.data?.length &&
      !isDataProcessed
    ) {
      setLoadingStep(3); // Processing data step

      // Add small delay to show processing step
      setTimeout(() => {
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
        setLoadingStep(4); // Final step

        // Small delay before showing form
        setTimeout(() => {
          setIsDataProcessed(true);
        }, 500);
      }, 1000);
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
      setLoadingStep(1);
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

  // Show loading progress
  if (isLoadingRecommendations || isLoadingLecturers || !isDataProcessed) {
    return <LoadingProgress step={loadingStep} totalSteps={4} />;
  }

  if (!listRecommendations?.data?.length || !listLecturers?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">📭</span>
        </div>
        <div className="text-gray-600 font-medium">Tidak ada data tersedia</div>
        <div className="text-sm text-gray-500 text-center">
          Pastikan data rekomendasi dan dosen sudah tersedia
        </div>
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
