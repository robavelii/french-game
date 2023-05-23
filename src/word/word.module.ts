import { Module } from '@nestjs/common';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { Word } from './entities/words.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasculineEnding } from './entities/masculineEndings.entity';
import { FeminineEnding } from './entities/feminineEndings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Word, MasculineEnding, FeminineEnding])],
  controllers: [WordController],
  providers: [WordService],
})
export class WordModule {}
