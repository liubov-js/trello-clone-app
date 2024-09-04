import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return await this.userRepository.create(dto);
  }

  async getAll() {
    return await this.userRepository.findAll();
  }

  async getOne(id: number) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException(
        'User not found or you do not have permission to view them.',
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async delete(id: number) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException(
        'User not found or you do not have permission to delete them.',
        HttpStatus.NOT_FOUND,
      );
    }

    await user.destroy();
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
