import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './entities/words.entity';
import * as wordData from '../../../../all_5000_mots.json';

@Injectable()
export class WordSeederService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async run() {
    const data = wordData;

    await Promise.all(data.map((item) => this.wordRepository.insert(item)));
  }
}
