import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './entities/words.entity';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async findAll(): Promise<Word[]> {
    return await this.wordRepository.find();
  }
  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.wordRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async findById(id: number): Promise<Word> {
    return await this.wordRepository.findOneBy({ id });
  }
  async getRandomWord(): Promise<Word> {
    const count = await this.wordRepository.count();
    const randomIndex = Math.floor(Math.random() * count);
    const randomWord = await await this.wordRepository.findOneBy({
      id: randomIndex,
    });
    return randomWord;
  }

  async findTranslationAndExample(word: string): Promise<{
    translation_en: string[];
    example: { phrase: string; translation_en: string };
  }> {
    console.log(word);
    const targetWord = await this.wordRepository.findOneBy({ word });
    console.log(targetWord);
    if (targetWord) {
      return {
        translation_en: targetWord.translation_en,
        example: targetWord.example,
      };
    } else {
      throw new Error('Word not found');
    }
  }
}
