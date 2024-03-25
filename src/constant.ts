import { UserEntity } from './user/user.entity';

export const ROLE_ADMIN = 'admin';
export enum Roles {
  ADMIN = ROLE_ADMIN,
  USER = 'user',
  GUEST = 'guest',
}
export const users: UserEntity[] = [
  {
    username: 'admin',
    password: 'admin',
    email: 'admin@gmail.com',
    first_name: 'Admin',
    last_name: 'Admin',
    role: 'admin',
  },
];
