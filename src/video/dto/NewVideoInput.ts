import { Field, InputType } from 'type-graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewVideoInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field()
  @MaxLength(50)
  filename: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(50)
  filenameOrg?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  description?: string;
}