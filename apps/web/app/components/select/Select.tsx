"use client";
import {
	Label,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Option {
	id: number;
	label: string;
}

interface SelectProps<V> {
	value: V;
	options: Option[];
	label?: string;
	onChange: (value: V) => void;
}

export function Select<V>({ value, options, label, onChange }: SelectProps<V>) {
	const selected = options.find((opt) => opt.id === value);

	return (
		<Listbox value={value} onChange={onChange}>
			{label ? (
				<Label className="block text-sm font-medium leading-6 text-gray-900">
					{label}
				</Label>
			) : null}
			<div className="relative mt-2">
				<ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
					<span className="block truncate">
						{selected?.label ?? "Select an option"}
					</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<ChevronUpDownIcon
							aria-hidden="true"
							className="h-5 w-5 text-gray-400"
						/>
					</span>
				</ListboxButton>

				<ListboxOptions
					transition
					className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
				>
					{options.map((opt) => (
						<ListboxOption
							key={opt.id}
							value={opt.id}
							className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white"
						>
							<span className="block truncate font-normal group-data-[selected]:font-semibold">
								{opt.label}
							</span>

							<span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-blue-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
								<CheckIcon aria-hidden="true" className="h-5 w-5" />
							</span>
						</ListboxOption>
					))}
				</ListboxOptions>
			</div>
		</Listbox>
	);
}
