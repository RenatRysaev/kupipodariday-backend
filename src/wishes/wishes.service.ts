import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<CreateWishDto>,
  ) {}

  create(createWishDto: CreateWishDto) {
    return this.wishRepository.save(createWishDto);
  }

  findAll() {
    return this.wishRepository.find();
  }

  findOne(id: string) {
    return this.wishRepository.findOneBy({ id });
  }

  update(id: string, updateWishDto: UpdateWishDto) {
    return this.wishRepository.update({ id }, updateWishDto);
  }

  remove(id: string) {
    return this.wishRepository.delete({ id });
  }
}
