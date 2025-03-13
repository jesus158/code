import { join } from 'path';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  ssl: false,
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
  migrations: [join(__dirname, './migrations/public/*{.ts,.js}')],
};
