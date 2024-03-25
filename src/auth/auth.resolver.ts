import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.response';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './get-user.decorator';
import { UserEntity } from '../user/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => LoginResponse)
  async login(
    @Args({ name: 'username', type: () => String }) username: string,
    @Args({ name: 'password', type: () => String }) password: string,
  ) {
    const token = await this.authService.login(username, password);
    return {
      accessToken: token,
    };
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity)
  async getCurrentUser(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return this.authService.getUser(user.id);
  }
}
