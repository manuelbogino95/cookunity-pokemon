"use client";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Card } from "../../components/card";
import { BattleRequest, PokemonCard } from "../../../types/pokemonCard";
import {
	getCardQueryOptions,
	getCardsQueryOptions,
} from "../../../utils/queries";
import { useState } from "react";
import { Select } from "../../components/select";
import { Button } from "../../components/button";
import { toast } from "react-toastify";

interface CardDetailsProps {
	id: string;
}

export function CardDetails({ id }: CardDetailsProps) {
	const { data: card } = useSuspenseQuery<PokemonCard>(getCardQueryOptions(id));
	const { data: allCards = [] } = useQuery(getCardsQueryOptions);
	const [selectedDefenderCard, setSelectedDefenderCard] = useState<
		number | null
	>(null);
	const mutation = useMutation({
		mutationFn: async (battle: BattleRequest) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/cards/battle`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(battle),
				}
			);
			return response.json();
		},
		onSuccess: (data) => {
			toast(`${card.name} ${data.succeeded ? "won!" : "lost!"}`, {
				type: data.succeeded ? "success" : "error",
			});
		},
		onError: () => {
			toast("An error occurred. Try again!", { type: "error" });
		},
	});

	function handleBattle() {
		if (!selectedDefenderCard) {
			return;
		}

		mutation.mutate({
			attackerCardId: card.id,
			defenderCardId: selectedDefenderCard,
		});
	}

	const battleCards = allCards
		.filter((item) => item.id !== card.id)
		.map((card) => ({ id: card.id, label: card.name }));

	return (
		<div className="flex flex-col items-center gap-9 w-full">
			<h1 className="text-3xl font-bold">{card.name}</h1>
			<div className="flex gap-8 items-center">
				<Card {...card} />
				<div className="rounded">VS</div>
				<div className="flex flex-col gap-4 min-w-96">
					<div>
						<Select
							label="Battle with"
							options={battleCards}
							value={selectedDefenderCard}
							onChange={(value) => setSelectedDefenderCard(value)}
						/>
					</div>
					<Button
						onClick={handleBattle}
						disabled={!selectedDefenderCard || mutation.isPending}
					>
						Battle!
					</Button>
				</div>
			</div>
		</div>
	);
}
