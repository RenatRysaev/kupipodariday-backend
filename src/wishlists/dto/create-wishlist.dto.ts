import { Shared } from '../../shared';

export class CreateWishlistDto extends Shared.BaseDto {
  name: string;
  description: string;
  image: string;
  items: string[];
}
