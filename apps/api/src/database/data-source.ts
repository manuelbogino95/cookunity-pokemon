import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { CardTypeSeeder } from './seeds/card-type.seeder';
import { CardsSeeder } from './seeds/cards.seeder';
import * as dotenv from 'dotenv';

dotenv.config();

const options: SeederOptions = {
  seeds: [CardTypeSeeder, CardsSeeder],
};

const seedDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});

export { seedDataSource, options };
