import { UUID } from 'crypto';
import { ILecturer } from './lecturer.interface';
import { IStudent } from './student.interface';

export interface IUser {
  id: UUID;
  fullName: string;
  email: string;
  username: string;
  password: string;
  imageUrl: string;
  student?: IStudent[];
  lecturer?: ILecturer[];
}
