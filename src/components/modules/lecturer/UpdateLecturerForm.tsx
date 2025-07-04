import { filterOptions } from '@/commons/constants/lecturer/filter-option-lecturer.constant';
import {
  updateLecturerSchema,
  UpdateLecturerSchema,
} from '@/commons/schema/update-lecturer.schema';
import { UpdateLecturerProps } from '@/commons/types/lecturer/update-lecturer-props.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useLecturerStore } from '@/store/lecturerStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { CameraIcon, Loader2, PlusIcon, RotateCcw, Save } from 'lucide-react';
import React, { useRef } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const UpdateLecturerForm: React.FC<UpdateLecturerProps> = ({
  data,
  onSuccess,
}) => {
  const form = useForm<UpdateLecturerSchema>({
    resolver: zodResolver(updateLecturerSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: data.fullName ?? '',
      nidn: data.nidn ?? '',
      tipePembimbing: data.tipePembimbing ?? '',
      prodi: data.prodi ?? '',
      kuotaBimbingan: data.kuotaBimbingan.toString() ?? '',
      file: data.imageUrl ?? '',
      jumlahBimbingan: data.jumlahBimbingan.toString() ?? '',
    },
  });
  const { loading } = useGlobalStore();
  const { photoPreview, setPhoto, photoFile } = useLecturerStore();
  const values: UpdateLecturerSchema = form.watch();
  const isEmpty = (val: number | string | undefined) => !val;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCancelForm = () => {
    form.reset();
    setPhoto(undefined);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const onSubmit: SubmitHandler<UpdateLecturerSchema> = (
    data: UpdateLecturerSchema,
  ) => {
    if (onSuccess) {
      data = {
        ...data,
        file: photoFile,
        tipePembimbing: data.tipePembimbing ?? undefined,
      };
      setPhoto(undefined);
      onSuccess(data);
    }
  };
  return (
    <FormProvider {...form}>
      <FormField
        control={form.control}
        name="file"
        render={() => (
          <FormItem className="flex justify-start relative w-[112px] flex-col items-center">
            <Avatar className="w-[112px] h-[112px] border-4 border-white mt-4">
              <AvatarImage
                src={
                  photoPreview ||
                  'https://res.cloudinary.com/dbuyqvhts/image/upload/v1744100470/uploads/iczoe4d0fedfping1ns6.png'
                }
                alt="Foto Dosen Pembimbing"
              />
              <AvatarFallback />
            </Avatar>
            {photoPreview ? (
              ''
            ) : (
              <Button
                type="button"
                className="absolute bottom-0 top-[60px] right-[5px] w-[102px] h-[55px] rounded-t-none rounded-b-full opacity-45 flex items-center justify-center"
                onClick={() => inputRef.current?.click()}
              >
                <div className="relative">
                  <CameraIcon className="scale-[2.2]" />
                  <PlusIcon className="absolute -bottom-[10px] -right-[15px] bg-white rounded-full text-neutral-700" />
                </div>
              </Button>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2 mt-3">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.fullName) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Nama Dosen
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Dosen" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="nidn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.nidn) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    NIDN
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Masukkan NIDN"
                      inputMode="numeric"
                      onKeyDown={(e) => {
                        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
                          e.preventDefault();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="kuotaBimbingan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.kuotaBimbingan) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Kuota Bimbingan
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Kuota Bimbingan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="prodi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.prodi) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Prodi
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Prodi" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.prodi.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="tipePembimbing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.tipePembimbing) && (
                      <span className="text-teal-500 text-xs">optional</span>
                    )}{' '}
                    Tipe Pembimbing
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Tipe Pembimbing" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.tipePembimbing.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="jumlahBimbingan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.jumlahBimbingan) && (
                      <span className="text-red-500">*</span>
                    )}
                    Jumlah Bimbingan
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <Button type="button" variant="outline" onClick={handleCancelForm}>
            <RotateCcw /> Reset
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="w-18 bg-primary-500 text-white flex justify-center hover:bg-blue-500 transition-all duration-200"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save />
                Ubah
              </>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateLecturerForm;
