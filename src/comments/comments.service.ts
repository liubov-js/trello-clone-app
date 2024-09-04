import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentsRepository: typeof Comment) {}

  async create(userId: number, columnId: number, cardId: number, dto: CreateCommentDto) {
    return await this.commentsRepository.create({ ...dto, userId, columnId, cardId });
  }

  async update(userId: number, columnId: number, cardId: number, id: number, dto: CreateCommentDto) {
    const comment = await this.commentsRepository.findOne({ where: { id, userId, columnId, cardId } });

    if (!comment) {
      throw new HttpException('Comment not found or you do not have permission to update it.', HttpStatus.NOT_FOUND);
    }

    return await comment.update(dto);
  }

  async getAll(userId: number, columnId: number, cardId: number) {
    return await this.commentsRepository.findAll({ where: { userId, columnId, cardId } });
  }

  async getOne(userId: number, columnId: number, cardId: number, id: number) {
    const comment = await this.commentsRepository.findOne({ where: { id, userId, columnId, cardId } });

    if (!comment) {
      throw new HttpException('Comment not found or you do not have permission to view it.', HttpStatus.NOT_FOUND);
    }

    return comment;
  }

  async delete(userId: number, columnId: number, cardId: number, id: number) {
    const comment = await this.commentsRepository.findOne({ where: { id, userId, columnId, cardId } });

    if (!comment) {
      throw new HttpException('Comment not found or you do not have permission to delete it.', HttpStatus.NOT_FOUND);
    }

    await comment.destroy();
  }
}
