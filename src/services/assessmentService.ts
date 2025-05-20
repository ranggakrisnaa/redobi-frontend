import apiService from '@/api/apiService';
import { IAssessment } from '@/commons/interface-model/assessment-entity.interface';
import { CreateAssessmentSchema } from '@/commons/schema/create-assessment.schema';
import { AssessmentPaginationResponse } from '@/commons/types/assessment/assessment-fetch-api.type';

export const fetchAssessmentPagination = async (
  page = 1,
  limit = 10,
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

  //   Object.entries(filters).forEach(([key, value]) => {
  //     if (value !== undefined && value !== '') {
  //       params.append(key, value.toString());
  //     }
  //   });

  if (sortBy) {
    params.append('sort', sortBy);
    params.append('order', sortOrder.toUpperCase());
  } else {
    params.append('sort', 'full_name');
    params.append('order', 'ASC');
  }

  const response = await apiService.get<AssessmentPaginationResponse>(
    `/assessments?${params.toString()}`,
  );
  return response.data;
};

export const createAssessment = async (data: CreateAssessmentSchema) => {
  const response = await apiService.post<IAssessment>('/assessment', data);
  return response.data;
};
