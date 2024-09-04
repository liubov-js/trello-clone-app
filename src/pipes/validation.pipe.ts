import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationExeption } from 'src/exeptions/validation.exeption';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length > 0) {
      let messages = errors.map((error) => {
        return `${error.property} - ${Object.values(error.constraints).join(', ')}`;
      });
      throw new ValidationExeption(messages);
    }

    return value;
  }
}
