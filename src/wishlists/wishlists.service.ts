import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<CreateWishlistDto>,
  ) {}

  create(createWishlistDto: CreateWishlistDto) {
    return this.wishlistRepository.save(createWishlistDto);
  }

  findAll() {
    return this.wishlistRepository.find();
  }

  findOne(id: string) {
    return this.wishlistRepository.findOneBy({ id });
  }

  update(id: string, updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistRepository.update({ id }, updateWishlistDto);
  }

  remove(id: string) {
    return this.wishlistRepository.delete({ id });
  }
}
