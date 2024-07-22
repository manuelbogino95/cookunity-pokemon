import { IsNotEmpty, IsNumber } from 'class-validator';

export class BattleDto {
  @IsNumber()
  @IsNotEmpty()
  attackerCardId: number;

  @IsNumber()
  @IsNotEmpty()
  defenderCardId: number;
}
