import SQLite, {ResultSet} from 'react-native-sqlite-storage';

SQLite.DEBUG(true);

export class DbService {
  private static readonly db = SQLite.openDatabase(
    {
      name: 'users.db',
      location: 'default',
    },
    () => console.log('Database opened'),
    error => console.error('Failed to initialize DB:', error),
  );

  static async init() {
    //await this.dropTable();
    await this.createTable();
  }

  private static async createTable() {
    await this.promisify(`
        CREATE TABLE IF NOT EXISTS users
        (
            id   INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT    NOT NULL,
            age  INTEGER NOT NULL
        );
    `);
  }

  private static async dropTable() {
    await this.promisify('DROP TABLE users');
  }

  static promisify (query: string, params: any[] = []) {
    return new Promise<ResultSet>((resolve, reject) => {
      this.db.executeSql(
        query,
        params,
        (transaction, result) => {
          console.log('Query executed successfully');
          console.log('Transaction:', transaction);
          console.log('Result:', result);

          // Workaround because of bug in library
          // First param is not Transaction object
          // Actually it is ResultSet object
          resolve(transaction as unknown as ResultSet);
        },
        error => {
          console.error('Error during execute query:', error);
          reject(error);
        },
      );
    });
  }

  static async select(query: string, params: any[] = []) {
    const result = await this.promisify(query, params);
    return result.rows.raw();
  }
}
