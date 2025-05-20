import { UUID } from 'crypto';
import { IBaseEntity } from './base-entity.interface';
import { ILecturer } from './lecturer-entity.interface';
import { ISession } from './session-entity.interface';
import { IStudent } from './student-entity.interface';

export interface IUser extends IBaseEntity {
  id: UUID;
  fullName: string;
  email: string;
  username: string;
  password: string;
  imageUrl: string;
  student?: IStudent[];
  lecturer?: ILecturer[];
  session?: ISession;
}
