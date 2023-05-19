import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEndingsTable1623647689317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'MasculineEndings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ending',
            type: 'varchar',
            isArray: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'FeminineEndings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ending',
            type: 'varchar',
            isArray: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('MasculineEndings');
    await queryRunner.dropTable('FeminineEndings');
  }
}
