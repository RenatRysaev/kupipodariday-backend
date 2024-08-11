import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/jwt/jwt.guard';

import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() reguest, @Body() createWishDto: CreateWishDto) {
    const user = reguest.user;
    console.log('user', user);
    return this.wishesService.create({ executor: user, createWishDto });
  }

  @UseGuards(JwtGuard)
  @Get('/last')
  findLastWish() {
    return this.wishesService.findLastWish();
  }

  @UseGuards(JwtGuard)
  @Get('/top')
  findTheMostPopularWish() {
    return this.wishesService.findTheMostPopularWish();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Req() reguest,
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    const user = reguest.user;

    return this.wishesService.update({ id, executor: user, updateWishDto });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Req() reguest, @Param('id') id: string) {
    const user = reguest.user;

    return this.wishesService.remove({ id, executor: user });
  }
}
