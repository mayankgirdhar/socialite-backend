import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn()
  id?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  last_name?: string;

  @Field()
  @Column({ nullable: false })
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar_url?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
