import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WordService } from './word.service';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'words',
  version: '1',
})
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.wordService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Get('random')
  @HttpCode(HttpStatus.OK)
  async getRandomWord() {
    return this.wordService.getRandomWord();
  }

  @Get('example')
  @HttpCode(HttpStatus.OK)
  async getTranslationAndUsage(@Query('word') word: string) {
    return this.wordService.findTranslationAndExample(word);
  }
}
