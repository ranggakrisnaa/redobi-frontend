import { UUID } from 'crypto';
import { IBaseEntity } from './base-entity.interface';
import { ILecturer } from './lecturer-entity.interface';
import { IStudent } from './student-entity.interface';

export interface IReccomendation extends IBaseEntity {
  id: UUID;
  studentId: UUID;
  lecturerId: UUID;
  reccomendationScore: number;
  lecturer?: ILecturer;
  student?: IStudent;
}
