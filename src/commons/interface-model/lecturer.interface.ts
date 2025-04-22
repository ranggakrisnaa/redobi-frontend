import { UUID } from 'crypto';
import { ProdiEnum } from '../enums/prodi.enum';
import { TipePembimbingEnum } from '../enums/tipe-pembimbing.enum';
import { IAssessment } from './assessment.interface';
import { IReccomendation } from './reccomendation.interface';
import { ISelection } from './selection.interface';
import { IUser } from './user.interface';

export interface ILecturer {
  id: UUID;
  nidn: string;
  fullName: string;
  jumlahBimbingan: number;
  tipePembimbing: TipePembimbingEnum;
  prodi: ProdiEnum;
  kuotaBimbingan: number;
  imageUrl: string;
  userId: UUID;
  user?: IUser;
  selection?: ISelection[];
  reccomendation?: IReccomendation[];
  assessment?: IAssessment[];
}
