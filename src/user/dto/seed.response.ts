import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SeedResponse {
  @Field()
  success: boolean;
}
