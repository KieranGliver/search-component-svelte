export type SearchResult<T> = {
    item: T;
    refIndex: number;
}

export interface ClassOptions {
	label: string;
	input: string;
	container: string;
	ul: string;
	li: string;
	li_selected: string;
	section: string;
	p: string;
	p_container: string;
}

export interface ComponentOptions {
	placeholder: string;
	limit: number;
	label: string;
	classes: Partial<ClassOptions>;
}
