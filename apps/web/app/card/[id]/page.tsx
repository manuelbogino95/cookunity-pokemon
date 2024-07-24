import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "../../../utils/getQueryClient";
import { getCardQueryOptions } from "../../../utils/queries";
import { CardDetails } from "./cardDetails";

export default function CardPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const queryClient = getQueryClient();

	void queryClient.prefetchQuery(getCardQueryOptions(id));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CardDetails {...{ id }} />
		</HydrationBoundary>
	);
}
