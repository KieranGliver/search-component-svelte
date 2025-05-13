import type { FuseResult } from 'fuse.js';

export { default as SearchBar } from './Search.svelte';
export type SearchResult<T> = FuseResult<T>;
