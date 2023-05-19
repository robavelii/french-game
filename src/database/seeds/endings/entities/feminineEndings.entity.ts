import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class FeminineEnding extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ending: string;
}
