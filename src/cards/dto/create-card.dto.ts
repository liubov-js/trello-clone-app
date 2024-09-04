import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ example: 'Task 1', description: 'Card title' })
  readonly title: string;

  @ApiProperty({ example: 'To do...', description: 'Card description' })
  readonly description: string;
}
