import { ClassEnum } from '@/commons/enums/class.enum.ts';
import { MajorEnum } from '@/commons/enums/major.enum.ts';
import { UUID } from 'crypto';
import { IReccomendation } from './reccomendation-entity.interface';
import { ISelection } from './selection-entity.interface';
import { IUser } from './user-entity.interface';

export interface IStudent {
  id: UUID;
  fullName: string;
  nim: string;
  tahunMasuk: number;
  major: MajorEnum;
  judulSkripsi: string;
  abstract: string;
  class: ClassEnum;
  imageUrl: string;
  userId: UUID;
  user?: IUser;
  selection?: ISelection[];
  reccomendation?: IReccomendation[];
}
