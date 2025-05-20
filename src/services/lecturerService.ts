import apiService from '@/api/apiService';
import { DefaultEnum } from '@/commons/enums/enum';
import { ILecturer } from '@/commons/interface-model/lecturer-entity.interface';
import { CreateLecturerSchema } from '@/commons/schema/create-lecturer.schema';
import { UpdateLecturerSchema } from '@/commons/schema/update-lecturer.schema';
import { LecturerPaginationResponse } from '@/commons/types/lecturer/lecturer-fetch-api.type';
import { LecturerFilter } from '@/commons/types/lecturer/lecturer-filter-data.type';

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

  const response = await apiService.get<LecturerPaginationResponse>(
    `/lecturers?${params.toString()}`,
  );
  return response.data;
};

export const fetchLecturerDetail = async (id: string) => {
  const response = await apiService.get<ILecturer>(`/lecturers/${id}`);
  return response.data;
};

export const deleteLecturer = async (ids: string[], id?: string) => {
  const url = id ? `/lecturers/${id}` : '/lecturers';
  const config = id ? {} : { lecturerIds: ids };

  const response = await apiService.delete<ILecturer | ILecturer[]>(
    url,
    config,
  );
  return response.data;
};

export const createLecturer = async (data: CreateLecturerSchema) => {
  const formData = new FormData();

  (Object.keys(data) as (keyof ILecturer)[]).forEach((key) => {
    const value = data[key as keyof CreateLecturerSchema];

    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });
  const response = await apiService.post<ILecturer>('/lecturers', data);
  return response.data;
};

export const updateLecturer = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateLecturerSchema;
}) => {
  const formData = new FormData();

  Object.keys(data as keyof ILecturer[]).forEach((key) => {
    const value = data[key as keyof UpdateLecturerSchema];

    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  const response = await apiService.put<ILecturer>(
    `/lecturers/${id}`,
    formData,
  );
  return response.data;
};

export const downloadExcelTemplateLecturer = async () => {
  const url = `${DefaultEnum.CLOUDCUBE_BASE_URL}/1745141441230-template_dosen.xlsx`;
  const response = await fetch(url);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.setAttribute('download', 'template_dosen_pembimbing.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
};

export const importEcxelLecturer = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiService.post<ILecturer[]>(
    '/lecturers/templates',
    formData,
  );
  return response.data;
};
