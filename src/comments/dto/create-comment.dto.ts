import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Good luck!', description: 'Comment text' })
  @IsNotEmpty()
  @IsString({ message: 'comment text must be a string' })
  readonly text: string;

  @ApiProperty({ example: 2, description: 'Comment author ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly authorId: number;
}
