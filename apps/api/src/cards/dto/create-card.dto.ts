import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class WeaknessDto {
  @IsNumber()
  typeId: number;

  @IsNumber()
  multiplier: number;
}

class ResistanceDto {
  @IsNumber()
  typeId: number;

  @IsNumber()
  value: number;
}

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  hp: number;

  @IsNumber()
  attackPower: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  types: number[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeaknessDto)
  weaknesses: WeaknessDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResistanceDto)
  resistances: ResistanceDto[];
}
