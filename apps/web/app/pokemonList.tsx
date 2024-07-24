"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card } from "./components/card";
import Link from "next/link";
import { getCardsQueryOptions } from "../utils/queries";

export function PokemonList() {
	const { data: cards } = useSuspenseQuery(getCardsQueryOptions);

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-3xl font-bold underline">Pokemon app</h1>
			<div className="grid grid-cols-1 gap-5 mt-8 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-10">
				{cards.map((item) => (
					<Link key={item.id} href={`/card/${item.id}`}>
						<Card {...item} />
					</Link>
				))}
			</div>
		</div>
	);
}
