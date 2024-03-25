import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const user = await this.userService.getUserByUsernameOrEmail(username);
      if (!user) {
        reject(new UnauthorizedException());
        return;
      } else {
        if (user.password === password) {
          const token = await this.generateToken({
            userId: user.id,
            role: user.role,
          });
          resolve(token);
        } else {
          reject(new UnauthorizedException());
        }
      }
    });
  }
  validateUser(userId: number): Promise<UserEntity> {
    return this.userService.getUserById(userId);
  }

  async getUser(userId): Promise<UserEntity> {
    const user = await this.userService.getUserById(userId);
    delete user.password;
    return user;
  }

  generateToken(payload: object): Promise<string> {
    return new Promise((resolve) => {
      const token = this.jwtService.sign(payload);
      resolve(token);
    });
  }
}
