import apiService from '@/api/apiService';
import { ILecturer } from '@/commons/interface-model/lecturer-entity.interface';
import { CreateLecturerSchema } from '@/commons/schema/create-lecturer.schema';
import { UpdateLecturerSchema } from '@/commons/schema/update-lecturer.schema';
import { LecturerPaginationResponse } from '@/commons/types/lecturer/lecturer-fetch-api.type';
import { LecturerFilter } from '@/commons/types/lecturer/lecturer-filter-data.type';
import { ResponseData } from '@/utils/responseData';

export const fetchLecturerPagination = async (
  page = 1,
  limit = 10,
  filters: LecturerFilter,
  search: string,
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'desc',
) => {
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

  const { data } = await apiService.get<LecturerPaginationResponse>(
    `/lecturers?${params.toString()}`,
  );
  return data;
};

export const fetchLecturerDetail = async (id: string) => {
  const { data } = await apiService.get<ResponseData<ILecturer>>(
    `/lecturers/${id}`,
  );
  return data.data;
};

export const deleteLecturer = async (ids: string[], id?: string) => {
  const url = id ? `/lecturers/${id}` : '/lecturers';
  const config = id ? {} : { lecturerIds: ids };

  const { data } = await apiService.delete<
    ResponseData<ILecturer | ILecturer[]>
  >(url, config);
  return data;
};

export const createLecturer = async (payload: CreateLecturerSchema) => {
  const formData = new FormData();

  (Object.keys(payload) as (keyof ILecturer)[]).forEach((key) => {
    const value = payload[key as keyof CreateLecturerSchema];

    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });
  const { data } = await apiService.post<ResponseData<ILecturer>>(
    '/lecturers',
    payload,
  );
  return data;
};

export const updateLecturer = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateLecturerSchema;
}) => {
  const formData = new FormData();

  Object.keys(payload as keyof ILecturer[]).forEach((key) => {
    const value = payload[key as keyof UpdateLecturerSchema];

    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  const { data } = await apiService.put<ResponseData<ILecturer>>(
    `/lecturers/${id}`,
    formData,
  );
  return data;
};

export const downloadExcelTemplateLecturer = async () => {
  const response = await apiService.get<ResponseData<{ supabaseUrl: string }>>(
    '/lecturers/templates',
  );

  const link = document.createElement('a');
  link.href = response.data.data.supabaseUrl;
  link.setAttribute('download', 'template_dosen_pembimbing.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importEcxelLecturer = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await apiService.post<ResponseData<ILecturer[]>>(
    '/lecturers/templates',
    formData,
  );
  return data;
};
