import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TrelloColumn } from './columns.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Card } from 'src/cards/cards.model';

@Module({
  providers: [ColumnsService],
  controllers: [ColumnsController],
  imports: [SequelizeModule.forFeature([TrelloColumn, User, Card])],
  exports: [ColumnsService],
})
export class ColumnsModule {}
