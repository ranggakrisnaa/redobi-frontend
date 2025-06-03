import apiService from '@/api/apiService';
import { ICriteria } from '@/commons/interface-model/criteria-entity.interface';
import { CreateCriteriaSchema } from '@/commons/schema/create-criteria.schema';
import { UpdateCriteriaSchema } from '@/commons/schema/update-criteria.schema';
import { CriteriaPaginationResponse } from '@/commons/types/criteria/criteria-fetch-api.type';
import { CriteriaFilter } from '@/commons/types/criteria/criteria-filter-data.type';
import { ResponseData } from '@/utils/responseData';

export const fetchCriteriaPagination = async (
  page = 1,
  limit = 10,
  filters: CriteriaFilter,
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

  const { data } = await apiService.get<CriteriaPaginationResponse>(
    `/criteria?${params.toString()}`,
  );
  return data;
};

export const fetchCriteriaDetail = async (id: number) => {
  const { data } = await apiService.get<ResponseData<ICriteria>>(
    `/criteria/${id}`,
  );
  return data.data;
};

export const createCriteria = async (payload: CreateCriteriaSchema) => {
  const { data } = await apiService.post<ResponseData<ICriteria>>(
    '/criteria',
    payload,
  );
  return data;
};

export const updateCriteria = async ({
  id,
  payload,
}: {
  id: number;
  payload: UpdateCriteriaSchema;
}) => {
  const { data } = await apiService.put<ResponseData<ICriteria>>(
    `/criteria/${id}`,
    payload,
  );
  return data;
};

export const deleteCriteria = async (ids: number[], id?: number) => {
  const url = id ? `/criteria/${id}` : '/criteria';
  const config = id ? {} : { criteriaIds: ids };

  const { data } = await apiService.delete<
    ResponseData<ICriteria | ICriteria[]>
  >(url, config);
  return data;
};
