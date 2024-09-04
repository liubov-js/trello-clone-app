import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './cards.model';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card) private cardRepository: typeof Card) {}

  async create(userId: number, columnId: number, dto: CreateCardDto) {
    return await this.cardRepository.create({ ...dto, userId, columnId });
  }

  async update(
    userId: number,
    columnId: number,
    id: number,
    dto: CreateCardDto,
  ) {
    const card = await this.cardRepository.findOne({
      where: { id, userId, columnId },
    });

    if (!card) {
      throw new HttpException(
        'Card not found or you do not have permission to update it.',
        HttpStatus.NOT_FOUND,
      );
    }

    return await card.update(dto);
  }

  async getAll(userId: number, columnId: number) {
    return await this.cardRepository.findAll({ where: { userId, columnId } });
  }

  async getOne(userId: number, columnId: number, id: number) {
    const card = await this.cardRepository.findOne({
      where: { id, userId, columnId },
    });

    if (!card) {
      throw new HttpException(
        'Card not found or you do not have permission to view it.',
        HttpStatus.NOT_FOUND,
      );
    }

    return card;
  }

  async delete(userId: number, columnId: number, id: number) {
    const card = await this.cardRepository.findOne({
      where: { id, userId, columnId },
    });

    if (!card) {
      throw new HttpException(
        'Card not found or you do not have permission to delete it.',
        HttpStatus.NOT_FOUND,
      );
    }

    await card.destroy();
  }
}
