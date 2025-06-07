import apiService from '@/api/apiService';
import { IThesisKeyword } from '@/commons/interface-model/thesis-keyword-entity.interface';
import { CreateThesisKeywordSchema } from '@/commons/schema/create-thesis-keyword.schema';
import { UpdateThesisKeywordSchema } from '@/commons/schema/update-thesis-keyword.schema';
import { ThesisKeywordPaginationResponse } from '@/commons/types/thesis-keyword/thesis-keyword-fetch-api.type';
import { ThesisKeywordFilter } from '@/commons/types/thesis-keyword/thesis-keyword-filter-data.type';
import { ResponseData } from '@/utils/responseData';

export const fetchThesisKeywordPagination = async (
  page = 1,
  limit = 10,
  filters: ThesisKeywordFilter,
  search: string,
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'desc',
): Promise<ThesisKeywordPaginationResponse> => {
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

  const { data } = await apiService.get<ThesisKeywordPaginationResponse>(
    `/thesis-keywords?${params.toString()}`,
  );
  console.log(data);

  return data;
};

export const createThesisKeyword = async (
  payload: CreateThesisKeywordSchema,
) => {
  const { data } = await apiService.post<ResponseData<IThesisKeyword>>(
    '/thesis-keywords',
    payload,
  );
  return data.data;
};

export const fetchThesisKeywordDetail = async (id: string) => {
  const { data } = await apiService.get<ResponseData<IThesisKeyword>>(
    `/thesis-keywords/${id}`,
  );
  return data.data;
};

export const updateThesisKeyword = async ({
  payload,
  id,
}: {
  payload: UpdateThesisKeywordSchema;
  id: number;
}) => {
  const { data } = await apiService.put<ResponseData<IThesisKeyword>>(
    `/thesis-keywords/${id}`,
    payload,
  );
  return data;
};

export const deleteThesisKeyword = async (ids: number[], id?: number) => {
  const url = id ? `/thesis-keywords/${id}` : '/thesis-keywords';
  const config = id ? {} : { thesisKeywordIds: ids };
  console.log(config);

  const { data } = await apiService.delete<
    ResponseData<IThesisKeyword | IThesisKeyword[]>
  >(url, config);
  return data;
};
