import { UUID } from 'crypto';
import { IAssessment } from './assessment.interface';
import { IReccomendation } from './reccomendation.interface';
import { ISelection } from './selection.interface';
import { IUser } from './user.interface';

export interface ILecturer {
  id: UUID;
  fullName: number;
  jumlahBimbingan: string;
  imageUrl: string;
  userId: UUID;
  user?: IUser;
  selection?: ISelection[];
  reccomendation?: IReccomendation[];
  assessment?: IAssessment[];
}
