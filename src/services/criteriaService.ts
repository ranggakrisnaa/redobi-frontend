import apiService from '@/api/apiService';
import { ICriteria } from '@/commons/interface-model/criteria.interface';
import { CreateCriteriaSchema } from '@/commons/schema/create-criteria.schema';
import { CriteriaPaginationResponse } from '@/commons/types/criteria/criteria-fetch-api.type';

export const fetchCriteriaPagination = async (
  page = 1,
  limit = 10,
  //   filters: LecturerFilter,
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

  const response = await apiService.get<CriteriaPaginationResponse>(
    `/criteria?${params.toString()}`,
  );
  return response.data;
};

export const createCriteria = async (data: CreateCriteriaSchema) => {
  const response = await apiService.post<ICriteria>('/criteria', data);
  return response.data;
};

export const deleteCriteria = async (ids: number[], id?: number) => {
  const url = id ? `/criteria/${id}` : '/criteria';
  const config = id ? {} : { criteriaIds: ids };

  const response = await apiService.delete<ICriteria | ICriteria[]>(
    url,
    config,
  );
  return response.data;
};
