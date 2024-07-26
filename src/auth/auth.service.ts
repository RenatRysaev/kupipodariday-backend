import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validatePassword(username: string, password: string) {
    const user = await this.usersService.findOne({ username });

    if (user && user.password === password) {
      const { password: userPassword, ...result } = user;
      return result;
    }

    return null;
  }

  public async signIn(user: CreateUserDto) {
    const payload = { sub: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
