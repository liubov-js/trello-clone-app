import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "src/users/users.model";

interface ColumnCreationAttribute {
  userId: number;
  columnName: string;
}

@Table({ tableName: 'columns' })
export class TrelloColumn extends Model<TrelloColumn, ColumnCreationAttribute> {
  @ApiProperty({ example: 1, description: 'Unique column ID'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'User ID'})
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({ example: 'Backlog', description: 'Column name'})
  @Column({ type: DataType.STRING, allowNull: false })
  columnName: string;

  @BelongsTo(() => User)
  owner: User;
}
