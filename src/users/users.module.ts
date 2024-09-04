import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TrelloColumn } from 'src/columns/columns.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, TrelloColumn])],
  exports: [UsersService],
})
export class UsersModule {}
