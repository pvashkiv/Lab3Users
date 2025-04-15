import {DbService} from './db.service.ts';

export type UserFields = {
  name: string;
  age: number;
};

export type User = {
  id: number;
} & UserFields;

export class UserService {
  static async getAll(): Promise<User[]> {
    return await DbService.select('SELECT * FROM users ORDER BY id DESC');
  }

  static async create(user: UserFields) {
    await DbService.promisify(
      'INSERT INTO users (name, age) VALUES (?, ?)',
      [user.name, user.age],
    );
  }

  static async update(user: User) {
    await DbService.promisify(
      'UPDATE users SET name = ?, age = ? WHERE id = ?',
      [user.name, user.age, user.id],
    );
  }

  static async delete(id: number) {
    await DbService.promisify('DELETE FROM users WHERE id = ?', [id]);
  }
}
