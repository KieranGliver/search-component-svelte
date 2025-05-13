<script lang="ts">
	import { SearchBar, type SearchResult } from '$lib/index.js';

	type Person = {
		name: string;
		age: number;
		role: string;
		location: string;
	};

	const data: Person[] = [
		{ name: 'John Doe', age: 30, role: 'Engineer', location: 'New York' },
		{ name: 'Jane Smith', age: 25, role: 'Designer', location: 'San Francisco' },
		{ name: 'Alice Johnson', age: 35, role: 'Product Manager', location: 'Chicago' },
		{ name: 'Carlos Martínez', age: 40, role: 'Engineer', location: 'Madrid' },
		{ name: 'Sakura Tanaka', age: 28, role: 'Data Scientist', location: 'Tokyo' },
		{ name: 'Ahmed Khan', age: 32, role: 'Backend Developer', location: 'Dubai' },
		{ name: 'Léa Dupont', age: 29, role: 'UX Researcher', location: 'Paris' },
		{ name: 'David Brown', age: 45, role: 'CTO', location: 'Austin' },
		{ name: 'Zhang Wei', age: 27, role: 'Frontend Developer', location: 'Shanghai' },
		{ name: 'Fatima Al-Fulan', age: 33, role: 'AI Specialist', location: 'Cairo' },
		{ name: 'Mikhail Ivanov', age: 44, role: 'Engineer', location: 'Tokyo' },
		{ name: 'Nina Kowalska', age: 26, role: 'Product Manager', location: 'Paris' },
		{ name: 'Samuel Kim', age: 38, role: 'Backend Developer', location: 'New York' },
		{ name: 'Chloe Müller', age: 31, role: 'UX Researcher', location: 'Berlin' },
		{ name: 'Rajesh Patel', age: 47, role: 'AI Specialist', location: 'Dubai' },
		{ name: 'Isabella Rossi', age: 36, role: 'Designer', location: 'Madrid' },
		{ name: 'Tomáš Novák', age: 42, role: 'CTO', location: 'San Francisco' },
		{ name: 'Yara Haddad', age: 23, role: 'Frontend Developer', location: 'Cairo' },
		{ name: 'Kojo Mensah', age: 34, role: 'Data Scientist', location: 'Chicago' },
		{ name: 'Emily Thompson', age: 39, role: 'Engineer', location: 'Austin' }
	];

	let searchResult: SearchResult<Person> | null = $state(null);

	const handleSelect = (result: SearchResult<Person>) => {
		searchResult = result;
	};

	const classes = {
		ul: 'bg-white border-2 border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto divide-y divide-gray-100'
	};

	const componentOptions = {
		limit: 10,
		label: 'Search Bar',
		placeholder: 'Type to search...',
		classes
	};
</script>

<div class="flex min-h-screen flex-col items-center gap-10 bg-slate-400 py-30">
	<h1 class="text-4xl font-bold">Search Example</h1>

	<div class="flex w-full max-w-2xl flex-col gap-2 rounded-md border-2 bg-gray-300 p-6">
		<h2 class="text-xl font-semibold">Search Data</h2>
		<code class="overflow-x-auto rounded-md bg-black p-4 font-mono text-sm text-white">
			{#each data as person}
				<p>
					{'{'} name: <span class="text-lime-500">{person.name}</span>, age:
					<span class="text-amber-500">{person.age}</span>, role:
					<span class="text-cyan-400">{person.role}</span>, location:
					<span class="text-red-500">{person.location}</span>
					{'}'}
				</p>
			{/each}
		</code>
	</div>

	<div class="flex w-full max-w-2xl flex-col gap-2 rounded-md border-2 bg-gray-300 p-6">
		<p class="text-sm opacity-70">Type to search for a person by name, role, or location.</p>
		<SearchBar
			{data}
			keys={['name', 'role', 'location']}
			{handleSelect}
			options={componentOptions}
		/>
	</div>
		<div class="flex w-full max-w-2xl flex-col gap-2 rounded-md border-2 bg-gray-300 p-6">
			<h2 class="font-semibold">Selected Result:</h2>
			{#if searchResult}
			{@const { item: selectedPerson, refIndex } = searchResult}
			<div class="rounded-md bg-black p-4 font-mono text-sm text-white">
				<p>{'{'} Item: {'{'} 
					Name: <span class="text-lime-500">{selectedPerson.name}</span>, 
					Age: <span class="text-amber-500">{selectedPerson.age}</span>, 
					Role: <span class="text-cyan-400">{selectedPerson.role}</span>, 
					Location: <span class="text-red-500">{selectedPerson.location}</span> 
					{'}'}, RefIndex: {refIndex} {'}'}</p>
			</div>
			{/if}
		</div>
</div>
