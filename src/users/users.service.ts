import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<CreateUserDto>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(by: Partial<Pick<CreateUserDto, 'id' | 'username'>>) {
    const user = await this.userRepository.findOneBy(by);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let preparedUpdateUserDto = updateUserDto;

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);

      preparedUpdateUserDto = {
        ...updateUserDto,
        password: hashedPassword,
      };
    }

    const updatedUser = await this.userRepository.update(
      { id },
      preparedUpdateUserDto,
    );

    return updatedUser;
  }

  async remove(id: string) {
    const removedUser = await this.userRepository.delete({ id });
    return removedUser;
  }
}
