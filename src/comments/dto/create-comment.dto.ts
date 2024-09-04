import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Good luck!', description: 'Comment text' })
  readonly text: string;

  @ApiProperty({ example: '2', description: 'Comment author ID' })
  readonly authorId: number;
}
