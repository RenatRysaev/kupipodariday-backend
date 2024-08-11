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
  @Get('me/wishes')
  getMyWishes(@Req() request) {
    const user = request.user;
    return this.usersService.getMyWishes(user.id);
  }

  @UseGuards(JwtGuard)
  @Get(':username')
  getUser(@Param() params) {
    return this.usersService.findOne({ username: params.username });
  }

  @UseGuards(JwtGuard)
  @Get(':username/wishes')
  getUserWishes(@Param() params) {
    return this.usersService.getUserWishes(params.username);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getProfile(@Req() request) {
    const user = request.user;
    return this.usersService.findOne({ id: user.id });
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  updateProfile(@Req() request, @Body() updateUserDto: UpdateUserDto) {
    const user = request.user;

    return this.usersService.update({
      id: user.id,
      updateUserDto,
    });
  }

  @UseGuards(JwtGuard)
  @Post('find')
  findAll(@Body() body) {
    return this.usersService.findMany(body.query);
  }
}
