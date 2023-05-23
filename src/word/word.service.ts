import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './entities/words.entity';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { MasculineEnding } from './entities/masculineEndings.entity';
import { FeminineEnding } from './entities/feminineEndings.entity';
import { ExampleResponse } from './word';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
    @InjectRepository(MasculineEnding)
    private readonly masculineRepository: Repository<MasculineEnding>,
    @InjectRepository(FeminineEnding)
    private readonly feminineRepository: Repository<FeminineEnding>,
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

  async findTranslationAndExample(
    word: string,
  ): Promise<ExampleResponse | any> {
    try {
      console.log(word);
      const targetWord = await this.wordRepository.findOneBy({ word });
      console.log(targetWord);
      if (targetWord) {
        const target = JSON.stringify({
          translation_en: targetWord.translation_en,
          example: targetWord.example,
        });
        return target;
      }
    } catch (error) {
      throw new Error('Word not found');
    }
  }
  async getMasculineEndings() {
    const endings = await this.masculineRepository.find();
    return JSON.stringify(endings);
  }
  async getFeminineEndings() {
    const endings = await this.feminineRepository.find();
    return JSON.stringify(endings);
  }
}
