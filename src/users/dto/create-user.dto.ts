import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'example@mail.com', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: 'Abc123', description: 'User password' })
  readonly password: string;
}
