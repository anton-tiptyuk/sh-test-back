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

  @Field()
  @MaxLength(50)
  uploadPath: string;

  @Field()
  @MaxLength(50)
  thumbnailPath: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  description?: string;
}