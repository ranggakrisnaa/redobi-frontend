import { UUID } from 'crypto';
import { ClassEnum } from '../enums/class.enum';
import { MajorEnum } from '../enums/major.enum';
import { IBaseEntity } from './base-entity.interface';
import { IRecommendation } from './recommendation-entity.interface';
import { ISelection } from './selection-entity.interface';
import { IUser } from './user-entity.interface';

export interface IStudent extends IBaseEntity {
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
  recommendation?: IRecommendation[];
}
