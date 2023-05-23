import { GameProgress } from 'src/game/entities/game.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Word extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;

  @Column()
  frequency: string;

  @Column('json')
  types: string[];

  @Column({ nullable: true })
  gender: string;

  @Column('json')
  translation_en: string[];

  @Column('json')
  example: { phrase: string; translation_en: string };

  @OneToMany(() => GameProgress, (gameProgress) => gameProgress.word)
  game_progress: GameProgress[];
}
