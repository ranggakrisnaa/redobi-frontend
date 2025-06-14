import { UUID } from 'crypto';
import { TipePembimbingEnum } from '../enums/tipe-pembimbing.enum';
import { IBaseEntity } from './base-entity.interface';
import { ILecturer } from './lecturer-entity.interface';
import { IStudent } from './student-entity.interface';

export interface IRecommendation extends IBaseEntity {
  id: UUID;
  studentId: UUID;
  lecturerId: UUID;
  recommendationScore: number;
  position: TipePembimbingEnum;
  lecturer?: ILecturer;
  student?: IStudent;
}
