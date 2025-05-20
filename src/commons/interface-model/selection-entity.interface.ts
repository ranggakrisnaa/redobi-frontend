import { UUID } from 'crypto';
import { IBaseEntity } from './base-entity.interface';
import { ILecturer } from './lecturer-entity.interface';
import { IStudent } from './student-entity.interface';

export interface ISelection extends IBaseEntity {
  id: UUID;
  studentId: UUID;
  lecturerId: UUID;
  lecturer?: ILecturer;
  student?: IStudent;
}
