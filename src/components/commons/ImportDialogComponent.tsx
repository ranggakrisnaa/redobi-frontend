import { useStudentImportExcel } from '@/hooks/useStudent';
import { useGlobalStore } from '@/store/globalStore';
import { AlertTriangle, FileCheck2, Loader, UploadCloud } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import AlertComponent from './AlertComponent';

type FormValues = {
  file: FileList;
};

type ImportDialogComponentProps = {
  onImport?: (file: File) => Promise<boolean>;
  titleDialog: string;
};

const ImportDialogComponent: React.FC<ImportDialogComponentProps> = ({
  onImport,
  titleDialog,
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isError } = useStudentImportExcel();
  const { error: globalError, setError: setGlobalError } = useGlobalStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0];
        setFileName(file.name);
        setValue('file', acceptedFiles as any, { shouldValidate: true });
        setError(null);
      }
    },
    [setValue],
  );

  const onDropRejected = useCallback(() => {
    setFileName(null);
    setError(
      'Format file tidak didukung. Hanya file .xlsx atau .xls yang diperbolehkan.',
    );
  }, []);

  useEffect(() => {
    if (open && !isSubmitting) {
      setFileName(null);
      setError(null);
      setValue('file', null as any);
      setIsSubmitting(false);
    }
  }, [open, setValue, isError, isSubmitting]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const file = data.file?.[0];
    const success = await onImport?.(file);
    setIsSubmitting(false);
    if (success) {
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (isSubmitting && open && !newOpen) {
          return;
        }
        if (!open) {
          setGlobalError(null);
        }
        setOpen(newOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="bg-warning-900 text-white hover:bg-[#E29A04] transition-all duration-200"
          onClick={() => setOpen(true)}
        >
          <UploadCloud className="w-4 h-4 mr-2" />
          Import Excel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-xl px-6 py-5">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            Import Excel {titleDialog}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            Unggah file Excel berisi data {titleDialog}. Pastikan file sesuai
            format yang telah ditentukan.
          </DialogDescription>
        </DialogHeader>
        {open && globalError && (
          <div className="py-2">
            <AlertComponent>
              <p>{globalError}</p>
            </AlertComponent>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errors.file && (
            <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.file.message as string}
            </div>
          )}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-2">
              <UploadCloud className="w-6 h-6 text-gray-500" />
              <p className="text-sm text-muted-foreground">
                Drag and drop file Excel di sini atau{' '}
                <span className="font-medium text-blue-600">
                  klik untuk memilih
                </span>
              </p>
            </div>
          </div>
          {fileName && (
            <div className="flex items-center gap-2 text-green-700 text-sm mt-1">
              <FileCheck2 className="w-4 h-4" />
              {fileName}
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-indigo-700 text-white hover:bg-indigo-800 transition-all"
              disabled={!watch('file') || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                </div>
              ) : (
                'Import Sekarang'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialogComponent;
