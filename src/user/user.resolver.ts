import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { SeedResponse } from './dto/seed.response';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { AdminAuthGuard } from '../auth/guards/role.guard';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    @Inject(UserService)
    private userService: UserService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @UseGuards(AdminAuthGuard)
  @Query(() => [UserEntity])
  async users(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }
  @Mutation(() => SeedResponse)
  async seedUsers() {
    await this.userService.seedUsers();
    return {
      success: true,
    };
  }
}
