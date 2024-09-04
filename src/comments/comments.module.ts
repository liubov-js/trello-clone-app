import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from 'src/cards/cards.model';
import { TrelloColumn } from 'src/columns/columns.model';
import { User } from 'src/users/users.model';
import { CommentsController } from './comments.controller';
import { Comment } from './comments.model';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    SequelizeModule.forFeature([TrelloColumn, User, Card, Comment]),
  ],
  exports: [CommentsService]
})
export class CommentsModule {}
