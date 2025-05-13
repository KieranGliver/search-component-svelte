<script lang="ts" generics="T">
	import Fuse from 'fuse.js/basic';
	import { type ComponentOptions } from './interfaces.js';
	import { validateOptions } from './utils.js';
	import { type SearchResult } from './index.js';

	interface Props {
		data: readonly T[];
		keys: string[];
		handleSelect?: (item: SearchResult<T>) => void;
		options?: Partial<ComponentOptions>;
	}

	let { handleSelect = $bindable((_result) => {}), data, keys, options }: Props = $props();

	const { classes, limit, label, placeholder } = validateOptions(options);

	const fuseOptions = {
		keys
	};

	const fuse = new Fuse(data, fuseOptions);

	let sectionRef: HTMLElement;
	let results: SearchResult<T>[] = $state([]);
	let value: string = $state('');

	let current: number = $state(-1);
	let visible: boolean = $state(false);

	const reset = () => {
		current = -1;
		results = [];
		value = '';
	};

	const onInput = () => {
		results = fuse.search(value, { limit });
		visible = results.length > 0;
	};

	const getValueByKey = (obj: any, key: string): any => {
		return key.split('.').reduce((acc, part) => acc?.[part], obj);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowDown') {
			current = Math.min(current + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			current = Math.max(current - 1, 0);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (current >= 0) {
				handleSelect(results[current]);
				reset();
			}
		} else if (e.key === 'Escape') {
			reset();
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		const path = event.composedPath();
		if (sectionRef && !path.includes(sectionRef)) {
			visible = false;
		} else {
			visible = true;
		}
	};
</script>

<svelte:window onkeydown={onKeyDown} onclick={handleClickOutside} />

<section class={classes.section} bind:this={sectionRef}>
	{#if label}
		<label for="search" class={classes.label}>{label}</label>
	{/if}
	<div class={classes.container}>
		<input
			id="search"
			class={classes.input}
			{placeholder}
			bind:value
			oninput={onInput}
			role="combobox"
			aria-autocomplete="list"
			aria-controls="search-results"
			aria-expanded={results.length > 0}
			aria-haspopup="listbox"
		/>
		{#if results.length > 0 && visible}
			<ul class={classes.ul} role="listbox">
				{#each results as r, i}
					<button
						type="button"
						onclick={() => {
							handleSelect(r);
							reset();
						}}
						class="size-full"
					>
						<li
							class={current === i ? classes.li_selected : classes.li}
							role="option"
							aria-selected={current === i}
							id={`option-${i}`}
							onmouseenter={() => (current = i)}
						>
							<div class={classes.p_container}>
								{#each keys as k}
									<p class={classes.p}>{getValueByKey(r.item, k)}</p>
								{/each}
							</div>
						</li>
					</button>
				{/each}
			</ul>
		{/if}
	</div>
</section>
