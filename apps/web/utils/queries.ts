import { queryOptions } from "@tanstack/react-query";
import { PokemonCard } from "../types/pokemonCard";

export const getCardsQueryOptions = queryOptions<PokemonCard[]>({
	queryKey: ["cards"],
	queryFn: async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/cards`
		);
		return response.json();
	},
});

export const getCardQueryOptions = (id: string) =>
	queryOptions<PokemonCard>({
		queryKey: ["card", id],
		queryFn: async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/cards/${id}`
			);
			return response.json();
		},
	});
