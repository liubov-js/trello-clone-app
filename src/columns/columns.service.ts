import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TrelloColumn } from './columns.model';
import { CreateColumnDto } from './dto/create-column.dto';

@Injectable()
export class ColumnsService {
  constructor(@InjectModel(TrelloColumn) private columnRepository: typeof TrelloColumn) {}

  async create(userId: number, dto: CreateColumnDto) {
    return await this.columnRepository.create({ ...dto, userId });
  }

  async update(userId: number, id: number, dto: CreateColumnDto) {
    const column = await this.columnRepository.findOne({ where: { id, userId } });

    if (!column) {
      throw new HttpException('Column not found or you do not have permission to update it.', HttpStatus.NOT_FOUND);
    }

    return await column.update(dto);
  }

  async getAll(userId: number) {
    return await this.columnRepository.findAll({ where: { userId } });
  }

  async getOne(userId: number, id: number) {
    const column = await this.columnRepository.findOne({ where: { id, userId } });

    if (!column) {
      throw new HttpException('Column not found or you do not have permission to view it.', HttpStatus.NOT_FOUND);
    }

    return column;
  }

  async delete(userId: number, id: number) {
    const column = await this.columnRepository.findOne({ where: { id, userId } });

    if (!column) {
      throw new HttpException('Column not found or you do not have permission to delete it.', HttpStatus.NOT_FOUND);
    }

    await column.destroy();
  }
}
