import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async getAll() {
    return await this.userRepository.findAll();
  }

  async getOne(id: number) {
    return await this.userRepository.findByPk(id);
  }

  async delete(id: number) {
    const user = await this.userRepository.findByPk(id);
    await user.destroy();
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
