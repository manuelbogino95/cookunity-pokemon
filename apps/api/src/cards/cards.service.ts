import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';
import { UpdateCardDto } from './dto/update-card.dto';
import { BattleDto } from './dto/battle.dto';
import { Weakness } from './entities/wakness.entity';
import { Resistance } from './entities/resistance.entity';
import { CardType } from './entities/card-type.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const { types, weaknesses, resistances, ...rest } = createCardDto;

    const card = this.cardsRepository.create(rest);

    card.types = types.map((typeId) => {
      const newType = new CardType();
      newType.id = typeId;

      return newType;
    });

    card.weaknesses = weaknesses.map((weakness) => {
      const newWeakness = new Weakness();
      const type = new CardType();
      type.id = weakness.typeId;
      newWeakness.type = type;
      newWeakness.multiplier = weakness.multiplier;

      return newWeakness;
    });

    card.resistances = resistances.map((resistance) => {
      const newResistance = new Resistance();
      const type = new CardType();
      type.id = resistance.typeId;
      newResistance.type = type;
      newResistance.value = resistance.value;

      return newResistance;
    });

    return this.cardsRepository.save(card);
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    const { types, weaknesses, resistances, ...rest } = updateCardDto;

    const card = await this.cardsRepository.findOneBy({ id });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    if (types.length) {
      card.types = types.map((typeId) => {
        const newType = new CardType();
        newType.id = typeId;

        return newType;
      });
    }

    if (weaknesses) {
      card.weaknesses = weaknesses.map((weakness) => {
        const newWeakness = new Weakness();
        const type = new CardType();
        type.id = weakness.typeId;
        newWeakness.type = type;
        newWeakness.multiplier = weakness.multiplier;

        return newWeakness;
      });
    }
    if (resistances) {
      card.resistances = resistances.map((resistance) => {
        const newResistance = new Resistance();
        const type = new CardType();
        type.id = resistance.typeId;
        newResistance.type = type;
        newResistance.value = resistance.value;

        return newResistance;
      });
    }

    return this.cardsRepository.save({ ...card, ...rest });
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.cardsRepository.findOneBy({ id });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async findAll(): Promise<Card[]> {
    return this.cardsRepository.find();
  }

  async remove(id: number): Promise<void> {
    const result = await this.cardsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
  }

  async battle({
    attackerCardId,
    defenderCardId,
  }: BattleDto): Promise<{ succeeded: boolean }> {
    const attackerCard = await this.findOne(attackerCardId);
    const defenderCard = await this.findOne(defenderCardId);

    if (!attackerCard) {
      throw new NotFoundException(
        `Attacker card with ID ${attackerCardId} not found`,
      );
    }
    if (!defenderCard) {
      throw new NotFoundException(
        `Defender card with ID ${defenderCardId} not found`,
      );
    }

    let damage = attackerCard.attackPower;

    attackerCard.types.forEach((type) => {
      const weakness = defenderCard.weaknesses.find(
        (weakness) => weakness.type.id === type.id,
      );
      if (weakness) {
        damage *= weakness.multiplier;
      }

      const resistance = defenderCard.resistances.find(
        (resistance) => resistance.type.id === type.id,
      );
      if (resistance) {
        damage -= Math.abs(resistance.value);
      }
    });

    if (damage >= defenderCard.hp) {
      return {
        succeeded: true,
      };
    }

    return {
      succeeded: false,
    };
  }

  async getCardWeaknessesAndResistances(id: number) {
    const card = await this.findOne(id);

    const weaknessTypeIds = card.weaknesses.map((weakness) => weakness.type.id);
    const resistanceTypeIds = card.resistances.map(
      (resistance) => resistance.type.id,
    );

    const cardsWeakAgainst = await this.cardsRepository
      .createQueryBuilder('card')
      .leftJoinAndSelect('card.types', 'types')
      .where('types.id IN (:...typeIds)', { typeIds: weaknessTypeIds })
      .andWhere('card.id != :id', { id: card.id })
      .getMany();

    const cardsResistantTo = await this.cardsRepository
      .createQueryBuilder('card')
      .leftJoinAndSelect('card.types', 'types')
      .where('types.id IN (:...typeIds)', { typeIds: resistanceTypeIds })
      .andWhere('card.id != :id', { id: card.id })
      .getMany();

    return { cardsWeakAgainst, cardsResistantTo };
  }
}
