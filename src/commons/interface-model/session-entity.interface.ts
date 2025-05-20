import { UUID } from 'crypto';
import { IBaseEntity } from './base-entity.interface';
import { IUser } from './user-entity.interface';

export interface ISession extends IBaseEntity {
  id: UUID;
  refreshToken: string;
  accessToken: string;
  otpCode: number;
  otpTrial: number;
  isLimit: boolean;
  validOtpUntil: Date;
  lockedUntil: Date;
  userId: UUID;
  user?: IUser;
}
