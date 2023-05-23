import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameProgress } from './entities/game.entity';
import { Word } from 'src/word/entities/words.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Word, GameProgress])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
