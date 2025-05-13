# Svelte Generic Search

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A flexible and reusable Svelte component implmenting Fuse.js to allow fuzzy searching input from the user.

## Installation

In a svelte 5 project use

```bash
npm install search-component-svelte
```

## Basic Usage

1. Replace `____YOUR____DATA____HERE____` with any generic object
2. Replace `___Your___KEYS___HERE___` with an Array of strings

```javascript
<script lang="ts">
	import { type SearchResult } from 'search-component-svelte/interfaces';
	import { SearchBar } from 'search-component-svelte';

	const data = ___YOUR___DATA___HERE___

	let searchResult: SearchResult<Person> | null = $state(null);

	const handleSelect = (result: SearchResult<Person>) => {
		searchResult = result;
	};

	const componentOptions = {
		limit: 10,
		label: 'Search Bar',
		placeholder: 'Type to search...',
		classes = {}
	};
</script>

<SearchBar
    {data}
    keys={___Your___KEYS___HERE___}
    {handleSelect}
    options={componentOptions}
/>
<p>{JSON.stringify(searchResult, null, 2)</p>
```

### Component Properties

| Prop           | Type                                | Required | Default              | Description                                                                                                                                     |
| -------------- | ----------------------------------- | -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`         | `T[]`                               | yes      | –                    | The list of items to search through. Each item is an object that can be searched based on the provided `keys`.                                  |
| `keys`         | `string[]`                          | yes      | –                    | An array of key paths (e.g., `"name"`, `"user.email"`) used by Fuse.js to search within the `data` items.                                       |
| `handleSelect` | `(result: SearchResult<T>) => void` | no       | `(_result) => {}`    | A callback function triggered when a user selects a search result. The selected result is passed as an argument.                                |
| `options`      | `Partial<ComponentOptions>`         | no       | `{ limit: -1, ... }` | Configuration options to customize the component's appearance and behavior, such as styling classes, result limit, label, and placeholder text. |

### Options

| Option        | Type                    | Default       | Description                                                                                                                                                          |
| ------------- | ----------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`       | `number`                | `-1`          | The maximum number of search results to show. Set to `-1` to show all matches.                                                                                       |
| `label`       | `string`                | `''`          | Optional label text displayed above the search input.                                                                                                                |
| `placeholder` | `string`                | `'Search...'` | Placeholder text shown in the search input.                                                                                                                          |
| `classes`     | `Partial<ClassOptions>` | `{}`          | An object containing Tailwind class names to style different parts of the component (e.g., `section`, `input`, `ul`, `li`, `li_selected`, `p_container`, `p`, etc.). |

### Styling (options.classes)

| Key           | Description                                                | Default Value                                                                                                                                                               |
| ------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `section`     | The main `<section>` wrapper around the whole component.   | `flex flex-col`                                                                                                                                                             |
| `label`       | Styles for the optional `<label>` above the input.         | `font-semibold`                                                                                                                                                             |
| `input`       | The search input field styling.                            | `border-1 w-full rounded-md border-0 shadow-sm bg-gray-100 py-2.5 pl-5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm`                         |
| `container`   | Container wrapping the input and results list.             | `""`                                                                                                                                                                        |
| `ul`          | The suggestions list container.                            | `absolute z-50 -mb-2 mt-1 max-h-60 overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y divide-gray-100` |
| `li`          | Each individual suggestion list item.                      | `z-50 cursor-default select-none py-2 px-2 lg:px-4 text-gray-900`                                                                                                           |
| `li_selected` | Style for the currently highlighted suggestion.            | `z-50 cursor-default select-none py-2 px-2 lg:px-4 bg-indigo-500 text-white`                                                                                                |
| `p_container` | Wrapper for the `p` fields inside each suggestion.         | `flex justify-between gap-2`                                                                                                                                                |
| `p`           | The `<p>` element displaying matched text from the result. | `font-semibold`                                                                                                                                                             |

### Events

**`handleSelect`** — Optional callback triggered when a user selects a result, either by clicking it or pressing `Enter`. It receives a `SearchResult<T>` object containing the matched item and metadata. Use this to handle selection logic such as autofill, navigation, or displaying more details.

### TypeScript

This component is written in TypeScript and includes type definitions for props (`Props`, `ComponentOptions`, `ClassOptions`) and the response (`SearchResult`). You can import these types from `svelte-search-component/interfaces` (adjust path if needed based on your setup).

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

[MIT](LICENSE)
