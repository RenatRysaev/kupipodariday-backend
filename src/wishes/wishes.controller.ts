import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }

  @Get()
  findAll() {
    return this.wishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Req() reguest,
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    const user = reguest.user;

    return this.wishesService.update({ id, executor: user, updateWishDto });
  }

  @Delete(':id')
  remove(@Req() reguest, @Param('id') id: string) {
    const user = reguest.user;

    return this.wishesService.remove({ id, executor: user });
  }
}
