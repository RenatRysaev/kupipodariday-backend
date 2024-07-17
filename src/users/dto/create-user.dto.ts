import { Shared } from '../../shared';

export class CreateUserDto extends Shared.BaseDto {
  username: string;
  about: string;
  avatar: string;
  email: string;
  wishes: string[];
  offers: string[];
  wishlists: string[];
}
