import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { IsString } from 'class-validator';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
