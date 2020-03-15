import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Video {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  filename: string;

  @Field({ nullable: true })
  filenameOrg?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;
}
