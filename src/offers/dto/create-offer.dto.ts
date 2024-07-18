import { Shared } from '../../shared';

export class CreateOfferDto extends Shared.BaseDto {
  user: string;
  item: string;
  amount: number;
  hidden: boolean;
}
