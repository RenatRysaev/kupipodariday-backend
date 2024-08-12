import { Shared } from '../../shared';
import { CreateWishDto } from '../../wishes/dto/create-wish.dto';

export class CreateUserDto extends Shared.BaseDto {
  username: string;
  password: string;
  about: string;
  avatar: string;
  email: string;
  wishes: CreateWishDto[];
  offers: string[];
  wishlists: string[];
}
