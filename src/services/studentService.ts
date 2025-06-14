import apiService from '@/api/apiService.ts';
import { IStudent } from '@/commons/interface-model/student-entity.interface';
import { CreateStudentSchema } from '@/commons/schema/create-student.schema.ts';
import { UpdateStudentSchema } from '@/commons/schema/update-student.schema';
import { StudentPaginationResponse } from '@/commons/types/student/student-fetch-api.type.ts';
import { StudentFilter } from '@/commons/types/student/student-filter-data.type.ts';
import { ResponseData } from '@/utils/responseData';

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

  const { data } = await apiService.get<StudentPaginationResponse>(
    `/students?${params.toString()}`,
  );
  return data;
};

export const fetchStudentDetail = async (id: string) => {
  const { data } = await apiService.get<ResponseData<IStudent>>(
    `/students/${id}`,
  );
  return data.data;
};

export const createStudent = async (payload: CreateStudentSchema) => {
  const formData = new FormData();

  (Object.keys(payload) as (keyof IStudent)[]).forEach((key) => {
    const value = payload[key as keyof CreateStudentSchema];

    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  const { data } = await apiService.post<ResponseData<IStudent>>(
    '/students',
    formData,
  );
  return data;
};

export const updateStudent = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateStudentSchema;
}) => {
  const formData = new FormData();

  (Object.keys(payload) as (keyof IStudent)[]).forEach((key) => {
    const value = payload[key as keyof UpdateStudentSchema];

    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  const { data } = await apiService.put<ResponseData<IStudent>>(
    `/students/${id}`,
    formData,
  );
  return data;
};

export const deleteStudent = async (ids: string[], id?: string) => {
  const url = id ? `/students/${id}` : '/students';
  const config = id ? {} : { studentIds: ids };

  const { data } = await apiService.delete<ResponseData<IStudent | IStudent[]>>(
    url,
    config,
  );
  return data;
};

export const downloadExcelTemplateStudent = async () => {
  const response = await apiService.get<ResponseData<{ supabaseUrl: string }>>(
    '/students/templates',
  );

  const link = document.createElement('a');
  link.href = response.data.data.supabaseUrl;
  link.setAttribute('download', 'template_mahasiswa.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importEcxelStudent = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await apiService.post<ResponseData<IStudent[]>>(
    '/students/templates',
    formData,
  );
  return data;
};
