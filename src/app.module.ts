import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { ColumnsModule } from './columns/columns.module';
import { TrelloColumn } from './columns/columns.model';
import { AuthModule } from './auth/auth.module';
import { CardsController } from './cards/cards.controller';
import { CardsModule } from './cards/cards.module';
import { Card } from './cards/cards.model';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comments.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, TrelloColumn, Card, Comment],
      autoLoadModels: true,
    }),
    UsersModule,
    ColumnsModule,
    AuthModule,
    CardsModule,
    CommentsModule,
  ],
  controllers: [CardsController],
})
export class AppModule {}
