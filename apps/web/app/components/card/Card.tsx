import Image from "next/image";
import { PokemonCard } from "../../../types/pokemonCard";

export function Card({ id, name, hp, types, attackPower }: PokemonCard) {
	const type = types[0];
	return (
		<div
			key={id}
			className="rounded-md w-72 border border-black p-4 flex flex-col gap-5"
		>
			<div className="flex justify-between items-center">
				<h2 className="text-xl">{name}</h2>
				<span>{hp} HP</span>
			</div>
			<div className="relative w-full h-52">
				<Image
					src={`${process.env.NEXT_PUBLIC_POKEMON_IMAGES_API_URL}/artwork/${name.toLowerCase()}.jpg`}
					alt={`${name} logo`}
					fill
				/>
			</div>
			{type ? (
				<div className="flex justify-between">
					<p className="text-lg font-medium">{type.name}</p>
					<p className="text-lg font-medium">{attackPower}</p>
				</div>
			) : null}
		</div>
	);
}
