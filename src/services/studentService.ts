import apiService from '@/api/apiService.ts';
import { DefaultEnum } from '@/commons/enums/enum';
import { IStudent } from '@/commons/interface-model/student.interface.ts';
import { CreateStudentSchema } from '@/commons/schema/create-student.schema.ts';
import { UpdateStudentSchema } from '@/commons/schema/update-student.schema';
import { StudentPaginationResponse } from '@/commons/types/student/student-fetch-api.type.ts';
import { StudentFilter } from '@/commons/types/student/student-filter-data.type.ts';

export const fetchStudentsPagination = async (
  page = 1,
  limit = 10,
  filters: StudentFilter,
  search: string,
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'desc',
): Promise<StudentPaginationResponse> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  if (search) {
    params.append('search', search);
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.append(key, value.toString());
    }
  });

  if (sortBy) {
    params.append('sort', sortBy);
    params.append('order', sortOrder.toUpperCase());
  } else {
    params.append('sort', 'full_name');
    params.append('order', 'ASC');
  }

  const response = await apiService.get<StudentPaginationResponse>(
    `/students?${params.toString()}`,
  );
  return response.data;
};

export const fetchStudentDetail = async (id: string) => {
  const response = await apiService.get<IStudent>(`/students/${id}`);
  return response.data;
};

export const createStudent = async (data: CreateStudentSchema) => {
  const formData = new FormData();

  (Object.keys(data) as (keyof IStudent)[]).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const value = data[key];

    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  const response = await apiService.post<IStudent>('/students', formData);
  return response.data;
};

export const updateStudent = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateStudentSchema;
}) => {
  console.log(data, id);

  const formData = new FormData();

  (Object.keys(data) as (keyof IStudent)[]).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const value = data[key];

    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  const response = await apiService.put<IStudent>(`/students/${id}`, formData);
  return response.data;
};

export const deleteStudent = async (ids: string[], id?: string) => {
  const url = id ? `/students/${id}` : '/students';
  const config = id ? {} : { studentIds: ids };

  const response = await apiService.delete<IStudent | IStudent[]>(url, config);
  return response.data;
};

export const downloadExcelTemplateStudent = async () => {
  const url = `${DefaultEnum.CLOUDCUBE_BASE_URL}/1744813264876-template_mahasiswa.xlsx`;
  const response = await fetch(url);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.setAttribute('download', 'template_mahasiswa.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
};

export const importEcxelStudent = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiService.post<IStudent[]>(
    '/students/templates',
    formData,
  );
  return response.data;
};
