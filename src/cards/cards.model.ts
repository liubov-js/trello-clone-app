import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { TrelloColumn } from 'src/columns/columns.model';
import { Comment } from 'src/comments/comments.model';

interface CardCreationAttribute {
  userId: number;
  columnId: number;
  title: string;
  description: string;
}

@Table({ tableName: 'cards' })
export class Card extends Model<Card, CardCreationAttribute> {
  @ApiProperty({ example: 1, description: 'Unique card ID' })
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

  @ApiProperty({ example: 'Task 1', description: 'Card title' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'To do...', description: 'Card description' })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @BelongsTo(() => TrelloColumn)
  column: TrelloColumn;

  @HasMany(() => Comment)
  comments: Comment[];
}
