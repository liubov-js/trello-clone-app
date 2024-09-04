import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrelloColumn } from './columns.model';
import { CreateColumnDto } from './dto/create-column.dto';

@ApiTags('Columns')
@Controller('users/:userId/columns')
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({ status: 200, type: TrelloColumn })
  @Post()
  create(@Param('userId') userId: number, @Body() dto: CreateColumnDto) {
    return this.columnsService.create(userId, dto);
  }

  @ApiOperation({ summary: 'Get all columns' })
  @ApiResponse({ status: 200, type: [TrelloColumn] })
  @Get()
  getAll(@Param('userId') userId: number) {
    return this.columnsService.getAll(userId);
  }

  @ApiOperation({ summary: 'Get column' })
  @ApiResponse({ status: 200, type: TrelloColumn })
  @Get(':id')
  getOne(@Param('userId') userId: number, @Param('id') id: number) {
    return this.columnsService.getOne(userId, id);
  }

  @ApiOperation({ summary: 'Update column' })
  @ApiResponse({ status: 204 })
  @Put(':id')
  update(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body() dto: CreateColumnDto,
  ) {
    return this.columnsService.update(userId, id, dto);
  }

  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  delete(@Param('userId') userId: number, @Param('id') id: number) {
    return this.columnsService.delete(userId, id);
  }
}
