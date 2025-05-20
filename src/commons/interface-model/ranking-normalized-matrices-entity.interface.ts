import { UUID } from 'crypto';
import { IBaseEntity } from './base-entity.interface';
import { INormalizedMatrices } from './normalized-matrices-entity.interface';
import { IRankingMatrices } from './ranking-matrices-entity.interface';

export interface IRankingNormalizedMatrices extends IBaseEntity {
  id: number;
  rankingMatricesId: UUID;
  normalizedMatricesId: UUID;
  rankingMatrices?: IRankingMatrices;
  normalizedMatrices?: INormalizedMatrices;
}
