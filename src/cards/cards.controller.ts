import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { Card } from './cards.model';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@ApiTags('Cards')
@UseGuards(OwnershipGuard)
@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {
  constructor(private cardService: CardsService) {}

  @ApiOperation({ summary: 'Create card' })
  @ApiResponse({ status: 200, type: Card })
  @Post()
  create(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Body() dto: CreateCardDto,
  ) {
    return this.cardService.create(userId, columnId, dto);
  }

  @ApiOperation({ summary: 'Get all cards' })
  @ApiResponse({ status: 200, type: [Card] })
  @Get()
  getAll(@Param('userId') userId: number, @Param('columnId') columnId: number) {
    return this.cardService.getAll(userId, columnId);
  }

  @ApiOperation({ summary: 'Get card' })
  @ApiResponse({ status: 200, type: Card })
  @Get(':id')
  getOne(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Param('id') id: number,
  ) {
    return this.cardService.getOne(userId, columnId, id);
  }

  @ApiOperation({ summary: 'Update card' })
  @ApiResponse({ status: 204 })
  @Put(':id')
  update(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Param('id') id: number,
    @Body() dto: CreateCardDto,
  ) {
    return this.cardService.update(userId, columnId, id, dto);
  }

  @ApiOperation({ summary: 'Delete card' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  delete(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Param('id') id: number,
  ) {
    return this.cardService.delete(userId, columnId, id);
  }
}
