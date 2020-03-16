import { Scalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';

import { GraphQLUpload } from 'graphql-upload';

@Scalar('Upload')
export class UploadScalar {
  description = 'Upload custom scalar type';

  parseValue(value: any) {
    return GraphQLUpload.parseValue(value);
  }

  serialize(value: any) {
    return GraphQLUpload.serialize(value);
  }

  parseLiteral(ast: ValueNode) {
    return GraphQLUpload.parseLiteral(ast, {});
  }
}
