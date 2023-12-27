import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNicknamePropertyToUserTable1703711931938 implements MigrationInterface {
    name = 'AddNicknamePropertyToUserTable1703711931938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "nickname" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nickname"`);
    }

}
