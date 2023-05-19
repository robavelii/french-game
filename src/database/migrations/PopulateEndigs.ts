import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateEndings1684427807481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { masculineEndings, feminineEndings } = {
      masculineEndings: ['age', 'aire', 'isme', 'ment', 'oir', 'sme', 'é'],
      feminineEndings: [
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
      ],
    };

    for (let ending of masculineEndings) {
      await queryRunner.query(
        `INSERT INTO MasculineEndings (ending) VALUES (${ending})`,
      );
    }

    for (let ending of feminineEndings) {
      await queryRunner.query(
        `INSERT INTO FeminineEndings (ending) VALUES (${ending})`,
      );
    }
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM MasculineEndings');
    await queryRunner.query('DELETE FROM FeminineEndings');
  }
}
