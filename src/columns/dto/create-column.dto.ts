import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ example: 'Backlog', description: 'Column name' })
  @IsNotEmpty()
  @IsString({ message: 'column name must be a string' })
  readonly columnName: string;
}
