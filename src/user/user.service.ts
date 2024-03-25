import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ROLE_ADMIN, users } from "../constant";
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    return this.userRepository.find();
  }
  async getAllUsersExceptAdmin() {
    return this.userRepository.find({
      where: { role: Not(ROLE_ADMIN) },
    });
  }
  async getUserByUsernameOrEmail(username: string) {
    return this.userRepository.findOne({
      where: [{ username }, { email: username }],
    });
  }

  async getUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async seedUsers() {
    for (const user of users) {
      const existingUser = await this.getUserByUsernameOrEmail(user.username);
      if (!existingUser) {
        await this.userRepository.save(user);
      }
    }
  }
}
