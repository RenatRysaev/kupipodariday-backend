import { Controller, Request, UseGuards, Body, Post } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

import { AuthService } from './auth.service';
import { LocalGuard } from './local/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  public async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Post('signup')
  public async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.signIn(user);
  }
}
