import { Shared } from '../../shared';

export class CreateWishDto extends Shared.BaseDto {
  name: string;
  link: string;
  image: string;
  price: number;
  raised: number;
  owner: string;
  description: string;
  offers: string[];
  copied: number;
}
