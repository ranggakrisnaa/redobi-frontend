import apiService from '@/api/apiService';
import { ResponseData } from '@/utils/responseData';

interface Statistic {
  guidanceProgress: {
    countStudentGuidance: number;
    countStudentUnguidance: number;
    percentageGuidance: number;
    percentageUnguidance: number;
  };
  countTotalData: {
    countStudentTotal: number;
    countLecturerTotal: number;
    countCriteriaTotal: number;
    countSubCriteriaTotal: number;
  };
  lecturerGuidance: { lecturerName: string; guidanceCount: number }[];
  getMajorTotal: { major: string; majorCount: number }[];
}

export const getStatistics = async () => {
  const response = await apiService.get<ResponseData<Statistic>>('/statistics');
  return response.data;
};
