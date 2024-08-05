import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
} from '@nestjs/common';

import { JwtGuard } from '../auth/jwt/jwt.guard';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getProfile(@Req() reguest) {
    const user = reguest.user;
    return this.usersService.findOne({ id: user.id });
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  updateProfile(@Req() reguest, @Body() updateUserDto: UpdateUserDto) {
    const user = reguest.user;

    return this.usersService.update({
      id: user.id,
      updateUserDto,
    });
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  getMyWishes(@Req() reguest) {
    const user = reguest.user;

    return user;
  }

  @UseGuards(JwtGuard)
  @Get(':username')
  getUser(@Param() username) {
    return this.usersService.findOne({ username });
  }

  @UseGuards(JwtGuard)
  @Get(':username/wishes')
  getUserWishes(@Req() reguest, @Param() username) {
    const user = reguest.user;
    return this.usersService.getUserWishes(username);
  }

  @UseGuards(JwtGuard)
  @Post('find')
  findAll(@Body() query: string) {
    return this.usersService.findMany(query);
  }
}
