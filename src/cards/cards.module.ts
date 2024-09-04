import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrelloColumn } from 'src/columns/columns.model';
import { User } from 'src/users/users.model';
import { CardsController } from './cards.controller';
import { Card } from './cards.model';
import { CardsService } from './cards.service';

@Module({
  providers: [CardsService],
  controllers: [CardsController],
  imports: [
    SequelizeModule.forFeature([TrelloColumn, User, Card]),
  ],
  exports: [CardsService],
})
export class CardsModule {}
