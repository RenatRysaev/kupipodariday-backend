import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

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

  update({
    executor,
    id,
    updateWishDto,
  }: {
    executor: CreateUserDto;
    id: string;
    updateWishDto: UpdateWishDto;
  }) {
    if (String(executor.id) !== String(id)) {
      throw new ForbiddenException();
    }

    return this.wishRepository.update({ id }, updateWishDto);
  }

  remove({ executor, id }: { executor: CreateUserDto; id: string }) {
    if (String(executor.id) !== String(id)) {
      throw new ForbiddenException();
    }

    return this.wishRepository.delete({ id });
  }
}
