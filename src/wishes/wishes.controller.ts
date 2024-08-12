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
  create(@Req() request, @Body() createWishDto: CreateWishDto) {
    const user = request.user;
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
    @Req() request,
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    const user = request.user;

    console.log('id', id);
    console.log('user', user);

    return this.wishesService.update({ id, executor: user, updateWishDto });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Req() request, @Param('id') id: string) {
    const user = request.user;

    return this.wishesService.remove({ id, executor: user });
  }
}
