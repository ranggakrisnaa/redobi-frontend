import { filterOptions } from '@/commons/constants/student/filter-option-student.constant.ts';
import {
  createStudentSchema,
  CreateStudentSchema,
} from '@/commons/schema/create-student.schema.ts';
import { CreateStudentProps } from '@/commons/types/student/create-student-props.type.ts';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { useGlobalStore } from '@/store/globalStore';
import { useStudentStore } from '@/store/studentStore.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { CameraIcon, Loader2, PlusIcon, RotateCcw, Save } from 'lucide-react';
import * as React from 'react';
import { useRef } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const CreateStudentForm: React.FC<CreateStudentProps> = ({ onSuccess }) => {
  const form = useForm<CreateStudentSchema>({
    resolver: zodResolver(createStudentSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      nim: '',
      class: '',
      abstract: '',
      judulSkripsi: '',
      major: '',
      tahunMasuk: '',
      file: '',
    },
  });
  const { loading } = useGlobalStore();
  const { photoPreview, setPhoto, photoFile } = useStudentStore();
  const values: CreateStudentSchema = form.watch();
  const isEmpty = (val: number | string | undefined) => !val;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleCancelForm = () => {
    form.reset();
    setPhoto(undefined);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onSubmit: SubmitHandler<CreateStudentSchema> = (
    data: CreateStudentSchema,
  ) => {
    if (onSuccess) {
      data = {
        ...data,
        file: photoFile,
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
                alt="Foto Mahasiswa"
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
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.fullName) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Nama Mahasiswa
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Nama Mahasiswa" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.nim) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    NIM
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Masukkan NIM"
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
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <FormField
              name="tahunMasuk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.tahunMasuk) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Angkatan
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih angkatan" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.angkatan.map((option) => (
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
          <div className="w-full">
            <FormField
              name="major"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.major) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Jurusan
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jurusan" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.jurusan.map((option) => (
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
          <div className="w-full">
            <FormField
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.class) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Kelas
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.kelas.map((option) => (
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
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <FormField
              name="judulSkripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {' '}
                    {isEmpty(values.judulSkripsi) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Judul Skripsi
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan Judul Skripsi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <FormField
              name="abstract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isEmpty(values.abstract) && (
                      <span className="text-red-500">*</span>
                    )}{' '}
                    Abstrak
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Masukkan Abstrak"
                      className="h-[140px]"
                    />
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
            disabled={loading}
            className="w-18 bg-primary-500 text-white flex justify-center hover:bg-blue-500 transition-all duration-200"
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

export default CreateStudentForm;
