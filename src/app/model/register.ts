import { Operation } from './operation';

export interface Register {
  balance: number[];
  associates: number;
  operations: Operation[];
}
