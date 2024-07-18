import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<CreateOfferDto>,
  ) {}

  create(createOfferDto: CreateOfferDto) {
    return this.offerRepository.save(createOfferDto);
  }

  findAll() {
    return this.offerRepository.find();
  }

  findOne(id: string) {
    return this.offerRepository.findOneBy({ id });
  }

  update(id: string, updateOfferDto: UpdateOfferDto) {
    return this.offerRepository.update({ id }, updateOfferDto);
  }

  remove(id: string) {
    return this.offerRepository.delete({ id });
  }
}
