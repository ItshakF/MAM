import { ProfitDeduce } from './profit-deduce';

export interface User {
  name: string;
  sharePourcentage: number;
  translatedValue: number;
  payBot: boolean;
  profitDeduce: ProfitDeduce;
}
