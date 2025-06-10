import { UUID } from 'crypto';
import { IBaseEntity } from './base-entity.interface';
import { ILecturer } from './lecturer-entity.interface';
import { IStudent } from './student-entity.interface';

export interface IRecommendation extends IBaseEntity {
  id: UUID;
  studentId: UUID;
  lecturerId: UUID;
  recommendationScore: number;
  lecturer?: ILecturer;
  student?: IStudent;
}
