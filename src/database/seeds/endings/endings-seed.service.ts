import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasculineEnding } from './entities/masculineEndings.entity';
import { FeminineEnding } from './entities/feminineEndings.entity';

@Injectable()
export class FrenchWordSeedService {
  constructor(
    @InjectRepository(MasculineEnding)
    private masculineEndingRepository: Repository<MasculineEnding>,
    @InjectRepository(FeminineEnding)
    private feminineEndingRepository: Repository<FeminineEnding>,
  ) {}

  async run() {
    const masculineEndings = ['age', 'aire', 'isme', 'ment', 'oir', 'sme', 'é'];
    const feminineEndings = [
      'ade',
      'ance',
      'ence',
      'ette',
      'ie',
      'ine',
      'ion',
      'ique',
      'isse',
      'ité',
      'lle',
      'ure',
    ];

    for (const ending of masculineEndings) {
      await this.masculineEndingRepository.save(
        this.masculineEndingRepository.create({
          ending,
        }),
      );
    }

    for (const ending of feminineEndings) {
      await this.feminineEndingRepository.save(
        this.feminineEndingRepository.create({
          ending,
        }),
      );
    }
  }
}
