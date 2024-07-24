import { CardType } from '../../cards/entities/card-type.entity';
import { Card } from '../../cards/entities/card.entity';
import { Resistance } from '../../cards/entities/resistance.entity';
import { Weakness } from '../../cards/entities/wakness.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

const cardsData = [
  {
    name: 'Pikachu',
    hp: 60,
    attackPower: 20,
    types: ['Lightning'],
    weaknesses: [{ type: 'Fighting', multiplier: 2 }],
    resistances: [{ type: 'Metal', value: 20 }],
  },
  {
    name: 'Charizard',
    hp: 180,
    attackPower: 120,
    types: ['Fire'],
    weaknesses: [{ type: 'Water', multiplier: 2 }],
    resistances: [],
  },
  {
    name: 'Onix',
    hp: 90,
    attackPower: 40,
    types: ['Fighting'],
    weaknesses: [{ type: 'Grass', multiplier: 1 }],
    resistances: [],
  },
  {
    name: 'Feraligatr',
    hp: 180,
    attackPower: 160,
    types: ['Water'],
    weaknesses: [{ type: 'Lightning', multiplier: 2 }],
    resistances: [],
  },
  {
    name: 'Sneasel',
    hp: 70,
    attackPower: 20,
    types: ['Darkness'],
    weaknesses: [{ type: 'Grass', multiplier: 2 }],
    resistances: [],
  },
  {
    name: 'Scizor',
    hp: 120,
    attackPower: 60,
    types: ['Metal'],
    weaknesses: [{ type: 'Fire', multiplier: 2 }],
    resistances: [{ type: 'Psychic', value: 20 }],
  },
  {
    name: 'Treecko',
    hp: 40,
    attackPower: 10,
    types: ['Psychic'],
    weaknesses: [{ type: 'Fire', multiplier: 1 }],
    resistances: [{ type: 'Water', value: 30 }],
  },
];

export class CardsSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const cardRepository = dataSource.getRepository(Card);
    const cardTypeRepository = dataSource.getRepository(CardType);

    for (const cardData of cardsData) {
      const card = new Card();
      card.name = cardData.name;
      card.hp = cardData.hp;
      card.attackPower = cardData.attackPower;

      card.types = await Promise.all(
        cardData.types.map(async (typeName: string) => {
          return await cardTypeRepository.findOne({
            where: { name: typeName },
          });
        }),
      );

      card.weaknesses = await Promise.all(
        cardData.weaknesses.map(async (weaknessData: any) => {
          const weakness = new Weakness();
          weakness.type = await cardTypeRepository.findOne({
            where: { name: weaknessData.type },
          });
          weakness.multiplier = weaknessData.multiplier;
          return weakness;
        }),
      );

      card.resistances = await Promise.all(
        cardData.resistances.map(async (resistanceData: any) => {
          const resistance = new Resistance();
          resistance.type = await cardTypeRepository.findOne({
            where: { name: resistanceData.type },
          });
          resistance.value = resistanceData.value;
          return resistance;
        }),
      );

      await cardRepository.save(card);
    }
  }
}
