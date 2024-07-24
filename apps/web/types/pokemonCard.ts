export interface CardType {
	id: number;
	name: string;
}

export interface PokemonCard {
	id: number;
	name: string;
	attackPower: number;
	hp: number;
	types: CardType[];
	resistances: CardType[];
	weaknesses: CardType[];
}

export interface BattleRequest {
	attackerCardId: number;
	defenderCardId: number;
}
