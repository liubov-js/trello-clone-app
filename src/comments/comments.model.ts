import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { TrelloColumn } from 'src/columns/columns.model';
import { Card } from 'src/cards/cards.model';

interface CommentCreationAttribute {
  userId: number;
  columnId: number;
  cardId: number;
  text: string;
  authorId: number;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttribute> {
  @ApiProperty({ example: 1, description: 'Unique comment ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'User ID' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({ example: 1, description: 'Column ID' })
  @ForeignKey(() => TrelloColumn)
  @Column({ type: DataType.INTEGER, allowNull: false })
  columnId: number;

  @ApiProperty({ example: 1, description: 'Card ID' })
  @ForeignKey(() => Card)
  @Column({ type: DataType.INTEGER, allowNull: false })
  cardId: number;

  @ApiProperty({ example: 'Good luck!', description: 'Comment text' })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({ example: 2, description: 'Comment author ID' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @BelongsTo(() => Card)
  column: Card;

  @BelongsTo(() => User)
  user: User;
}
