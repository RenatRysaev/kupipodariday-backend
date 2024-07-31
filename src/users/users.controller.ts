import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';

import { JwtGuard } from '../auth/jwt/jwt.guard';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Query('nameOrEmail') nameOrEmail: string) {
    return nameOrEmail
      ? this.usersService.findMany(nameOrEmail)
      : this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getProfile(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateProfile(
    @Req() reguest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = reguest.user;

    return this.usersService.update({ executor: user, id, updateUserDto });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Req() reguest, @Param('id') id: string) {
    const user = reguest.user;

    return this.usersService.remove({ executor: user, id });
  }
}
