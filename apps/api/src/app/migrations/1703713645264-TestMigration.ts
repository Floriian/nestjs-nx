import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1703713645264 implements MigrationInterface {
    name = 'TestMigration1703713645264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nickname"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "nickname" character varying`);
    }

}
