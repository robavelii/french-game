import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entities/words.entity';
import { WordSeederService } from './words-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
  providers: [WordSeederService],
  exports: [WordSeederService],
})
export class WordSeederModule {}
