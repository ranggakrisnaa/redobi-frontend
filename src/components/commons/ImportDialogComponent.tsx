import { AlertTriangle, FileCheck2, UploadCloud } from 'lucide-react';
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

type FormValues = {
  file: FileList;
};

type ImportDialogComponentProps = {
  onImport: (file: File) => void;
};

const ImportDialogComponent: React.FC<ImportDialogComponentProps> = ({
  onImport,
}) => {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    if (open) {
      setFileName(null);
      setError(null);
      setValue('file', null as any);
    }
  }, [open, setValue]);

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

  const onSubmit = (data: FormValues) => {
    const file = data.file?.[0];
    if (file) {
      onImport(file);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-warning-900 text-white hover:!bg-[#E29A04] transition-all duration-200"
          onClick={() => setOpen(true)}
        >
          <UploadCloud className="w-4 h-4 mr-2" />
          Import Excel
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl px-6 py-5">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            Import Excel Mahasiswa
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            Unggah file Excel berisi data mahasiswa. Pastikan file sesuai format
            yang telah ditentukan.
          </DialogDescription>
        </DialogHeader>
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
              disabled={!watch('file')}
            >
              Import Sekarang
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialogComponent;
