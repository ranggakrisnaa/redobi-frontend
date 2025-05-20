import { UUID } from 'crypto';
import { IBaseEntity } from './base-entity.interface';
import { ICriteria } from './criteria-entity.interface';
import { ILecturer } from './lecturer-entity.interface';
import { IRankingNormalizedMatrices } from './ranking-normalized-matrices-entity.interface';

export interface INormalizedMatrices extends IBaseEntity {
  id: UUID;
  criteriaId: number;
  lecturerId: UUID;
  normalizedValue: number;
  criteria?: ICriteria;
  lecturer?: ILecturer;
  rankingNormalizedMatrices?: IRankingNormalizedMatrices[];
}
