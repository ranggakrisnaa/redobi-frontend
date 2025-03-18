import { UUID } from 'crypto';
import { ClassEnum } from '../enums/class.enum';
import { MajorEnum } from '../enums/major.enum';
import { IReccomendation } from './reccomendation.interface';
import { ISelection } from './selection.interface';
import { IUser } from './user.interface';

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
