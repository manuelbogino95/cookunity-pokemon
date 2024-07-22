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
export class Resistance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CardType, { eager: true })
  @JoinColumn()
  type: CardType;

  @ManyToOne(() => Card, (card) => card.weaknesses)
  card: Card;

  @Column()
  value: number;
}
