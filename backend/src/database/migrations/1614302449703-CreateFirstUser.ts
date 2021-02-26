import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateFirstUser1614302449703
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        id: '98cfdc2f-420b-4ac8-9364-52e67cc3c432',
        name: 'admin',
        email: 'admin@gmail.com',
        password:
          '$2a$08$6qnJ0z.o12Gy/f5qzW3PquudYXuznd9tE5ACt.ecXXN0GC/cQzfLm',
        created_at: `${new Date()}`,
        updated_at: `${new Date()}`,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
