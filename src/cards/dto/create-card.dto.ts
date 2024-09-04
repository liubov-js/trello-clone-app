import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ example: 'Task 1', description: 'Card title' })
  @IsNotEmpty()
  @IsString({ message: 'card title must be a string' })
  readonly title: string;

  @ApiProperty({ example: 'To do...', description: 'Card description' })
  @IsString({ message: 'card description must be a string' })
  readonly description: string;
}
