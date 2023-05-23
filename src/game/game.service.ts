import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameProgress } from './entities/game.entity';
import { Repository } from 'typeorm';
import { Word } from 'src/word/entities/words.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameProgress)
    private readonly gameRepository: Repository<GameProgress>,
    @InjectRepository(Word) private readonly wordRepository: Repository<Word>,
  ) {}

  async getUnknownWords(userId: number): Promise<GameProgress[]> {
    // Get all words that the user hasn't marked as known
    const query = this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.word', 'word')
      .leftJoin('game.progress', 'progress', 'progress.userId = :userId', {
        userId,
      })
      .where('progress.known IS NULL')
      .orWhere('progress.known = false')
      .andWhere('game.userId=:userId', { userId })
      .select(['game.id', 'word.word']);

    return await query.getMany();
  }

  async getWellKnownWords(userId: number): Promise<GameProgress[]> {
    // Get all words that the user has marked as known
    const query = this.gameRepository
      .createQueryBuilder('gameprogress')
      .leftJoinAndSelect('gameprogress.word', 'word')
      .where('gameprogress.known = true')
      .andWhere('gameprogress.userId=:userId', { userId })
      .select(['gameprogress.id', 'word.word']);

    return await query.getMany();
  }

  async getLearnedWords(userId: number): Promise<GameProgress[]> {
    const query = await this.gameRepository
      .createQueryBuilder('gameprogress')
      .leftJoinAndSelect('gameprogress.word', 'word')
      .where('gameprogress.userId = :userId', { userId })
      .andWhere('gameprogress.known = true')
      .orderBy('gameprogress.createdAt', 'DESC')
      .getMany();

    return query;
  }

  async markWordAsKnown(userId: number, wordId: number): Promise<void> {
    // Mark a word as known by inserting a new progress record
    await this.gameRepository
      .createQueryBuilder()
      .insert()
      .into('game_progress')
      .values({ userId, wordId, known: true, createdAt: new Date() })
      .execute();
  }
}
