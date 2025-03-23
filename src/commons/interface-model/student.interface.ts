import { ClassEnum } from '@/commons/enums/class.enum.ts';
import { MajorEnum } from '@/commons/enums/major.enum.ts';
import { IReccomendation } from '@/commons/interface-model/reccomendation.interface.ts';
import { ISelection } from '@/commons/interface-model/selection.interface.ts';
import { IUser } from '@/commons/interface-model/user.interface.ts';
import { UUID } from 'crypto';

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
