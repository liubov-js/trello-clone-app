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
import { Comment } from './comments.model';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@UseGuards(OwnershipGuard)
@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 200, type: Comment })
  @Post()
  create(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(userId, columnId, cardId, dto);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get()
  getAll(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
  ) {
    return this.commentsService.getAll(userId, columnId, cardId);
  }

  @ApiOperation({ summary: 'Get comment' })
  @ApiResponse({ status: 200, type: Comment })
  @Get(':id')
  getOne(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Param('id') id: number,
  ) {
    return this.commentsService.getOne(userId, columnId, cardId, id);
  }

  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({ status: 204 })
  @Put(':id')
  update(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Param('id') id: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.update(userId, columnId, cardId, id, dto);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  delete(
    @Param('userId') userId: number,
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Param('id') id: number,
  ) {
    return this.commentsService.delete(userId, columnId, cardId, id);
  }
}
