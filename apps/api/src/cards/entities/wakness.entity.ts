import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { CardType } from './card-type.entity';

@Entity()
export class Weakness {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CardType, { eager: true })
  @JoinColumn()
  type: CardType;

  @Column()
  multiplier: number;

  @ManyToOne(() => Card, (card) => card.weaknesses)
  card: Card;
}
