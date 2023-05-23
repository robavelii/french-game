import { EntityHelper } from 'src/utils/entity-helper';
import { Word } from 'src/word/entities/words.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class GameProgress extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => Word, (word) => word.game_progress)
  @JoinColumn({ name: 'wordId' })
  word: Word;

  @Column()
  wordId: number;

  @Column()
  known: boolean;

  @Column()
  createdAt: Date;
}
