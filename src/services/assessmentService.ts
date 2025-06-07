import apiService from '@/api/apiService';
import { IAssessment } from '@/commons/interface-model/assessment-entity.interface';
import { CreateAssessmentSchema } from '@/commons/schema/create-assessment.schema';
import { UpdateAssessmentSchema } from '@/commons/schema/update-assessment.schema';
import { AssessmentPaginationResponse } from '@/commons/types/assessment/assessment-fetch-api.type';
import { ResponseData } from '@/utils/responseData';

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
  console.log(search);

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

  console.log(search);

  const { data } = await apiService.get<AssessmentPaginationResponse>(
    `/assessments?${params.toString()}`,
  );
  return data;
};

export const createAssessment = async (payload: CreateAssessmentSchema) => {
  const { data } = await apiService.post<ResponseData<IAssessment>>(
    '/assessments',
    payload,
  );
  return data.data;
};

export const updateAssessment = async ({
  payload,
  id,
}: {
  payload: UpdateAssessmentSchema;
  id: string;
}) => {
  console.log(id);

  const { data } = await apiService.put<ResponseData<IAssessment>>(
    `/assessments/${id}`,
    payload,
  );
  return data;
};

export const fecthAssessmentDetail = async (id: string) => {
  const { data } = await apiService.get<ResponseData<IAssessment>>(
    `/assessments/${id}`,
  );
  return data.data;
};

export const deleteAssessment = async (ids: string[], id?: string) => {
  const url = id ? `/assessments/${id}` : '/assessments';
  const config = id ? {} : { assessmentIds: ids };

  const { data } = await apiService.delete<
    ResponseData<IAssessment | IAssessment[]>
  >(url, config);
  return data;
};
