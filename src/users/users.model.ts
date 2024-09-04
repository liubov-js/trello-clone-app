import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { TrelloColumn } from "src/columns/columns.model";

interface UserCreationAttribute {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttribute> {
  @ApiProperty({ example: 1, description: 'Unique user ID'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'example@mail.com', description: 'User email'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'Abc123', description: 'User password'})
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => TrelloColumn)
  columns: TrelloColumn[];
}
