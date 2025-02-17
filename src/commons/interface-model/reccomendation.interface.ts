import { UUID } from 'crypto';
import { ILecturer } from './lecturer.interface';
import { IStudent } from './student.interface';

export interface IReccomendation {
  id: number;
  studentId: UUID;
  lecturerId: UUID;
  reccomendationScore: number;
  lecturer?: ILecturer;
  student?: IStudent;
}
