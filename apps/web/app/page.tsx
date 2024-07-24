import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "../utils/getQueryClient";
import { PokemonList } from "./pokemonList";
import { getCardsQueryOptions } from "../utils/queries";

export default async function HomePage() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery(getCardsQueryOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PokemonList />
		</HydrationBoundary>
	);
}
