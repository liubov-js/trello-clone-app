import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({ example: 'Backlog', description: 'Column name'})
  readonly columnName: string;
}
