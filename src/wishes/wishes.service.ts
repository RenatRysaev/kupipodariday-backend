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

  async create({
    executor,
    createWishDto,
  }: {
    executor: CreateUserDto;
    createWishDto: CreateWishDto;
  }) {
    const createdWish = await this.wishRepository.save({
      ...createWishDto,
      owner: executor.id,
    });
    return createdWish;
  }

  async findOne(id: string) {
    const wish = await this.wishRepository.findOneBy({ id });
    return wish;
  }

  async findLastWish() {
    const lastWish = await this.wishRepository.find({
      take: 1,
      order: { id: 'DESC', name: 'DESC' },
    });
    return lastWish;
  }

  async findTheMostPopularWish() {
    const maxCopied = await this.wishRepository.maximum('copied');
    const mostPopularWish = await this.wishRepository.findOne({
      where: { copied: maxCopied },
    });
    return mostPopularWish;
  }

  async update({
    executor,
    id,
    updateWishDto,
  }: {
    executor: CreateUserDto;
    id: string;
    updateWishDto: UpdateWishDto;
  }) {
    const isWishBelongsToUser = !!executor.wishes.find(
      (wish) => String(wish.id) === String(id),
    );

    if (!isWishBelongsToUser) {
      throw new ForbiddenException();
    }

    await this.wishRepository.update({ id }, updateWishDto);
  }

  async remove({ executor, id }: { executor: CreateUserDto; id: string }) {
    const isWishBelongsToUser = !!executor.wishes.find(
      (wish) => String(wish.id) === String(id),
    );

    if (!isWishBelongsToUser) {
      throw new ForbiddenException();
    }

    const wishToDeleted = await this.wishRepository.findOne({ where: { id } });
    await this.wishRepository.delete({ id });
    return wishToDeleted;
  }
}
