import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'example@mail.com', description: 'User email' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'Abc123', description: 'User password' })
  @IsNotEmpty()
  @IsString({ message: 'password must be a string' })
  @Length(5, 20, {
    message: 'password length must be more than 5 and less then 20 symbols',
  })
  readonly password: string;
}
