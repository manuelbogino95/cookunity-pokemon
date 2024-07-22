import { CardType } from '../../cards/entities/card-type.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

const cardTypesData = [
  { name: 'Darkness' },
  { name: 'Fighting' },
  { name: 'Fire' },
  { name: 'Grass' },
  { name: 'Lightning' },
  { name: 'Metal' },
  { name: 'Psychic' },
  { name: 'Water' },
];

export class CardTypeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const cardTypeRepository = dataSource.getRepository(CardType);

    for (const cardTypeData of cardTypesData) {
      const cardType = new CardType();
      cardType.name = cardTypeData.name;
      await cardTypeRepository.save(cardType);
    }
  }
}
