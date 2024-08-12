import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  async findOne(by: Partial<Pick<CreateUserDto, 'id' | 'username'>>) {
    const user = await this.userRepository.findOne({
      where: [{ id: by.id }, { username: by.id }],
      relations: {
        wishes: true,
      },
    });
    return user;
  }

  async findMany(nameOrEmail: string) {
    const users = await this.userRepository.find({
      where: [{ email: nameOrEmail }, { username: nameOrEmail }],
    });

    return users;
  }

  async update({
    id,
    updateUserDto,
  }: {
    id: string;
    updateUserDto: UpdateUserDto;
  }) {
    let preparedUpdateUserDto = updateUserDto;

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);

      preparedUpdateUserDto = {
        ...updateUserDto,
        password: hashedPassword,
      };
    }

    await this.userRepository.update({ id }, preparedUpdateUserDto);

    const updatedUser = await this.userRepository.findOneBy({ id });
    return updatedUser;
  }

  async getMyWishes(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        wishes: true,
      },
    });
    return user.wishes;
  }

  async getUserWishes(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: {
        wishes: true,
      },
    });
    return user.wishes;
  }
}
