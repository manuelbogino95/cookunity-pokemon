import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Weakness } from './wakness.entity';
import { Resistance } from './resistance.entity';
import { CardType } from './card-type.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  attackPower: number;

  @Column()
  hp: number;

  @ManyToMany(() => CardType, { eager: true })
  @JoinTable()
  types: CardType[];

  @OneToMany(() => Weakness, (Weakness) => Weakness.card, {
    cascade: true,
    eager: true,
  })
  weaknesses: Weakness[];

  @OneToMany(() => Resistance, (Resistance) => Resistance.card, {
    cascade: true,
    eager: true,
  })
  resistances: Resistance[];
}
