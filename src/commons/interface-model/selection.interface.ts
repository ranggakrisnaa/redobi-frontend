import { UUID } from 'crypto';
import { ILecturer } from './lecturer.interface';
import { IStudent } from './student.interface';

export interface ISelection {
  id: number;
  studentId: UUID;
  lecturerId: UUID;
  lecturer?: ILecturer;
  student?: IStudent;
}
