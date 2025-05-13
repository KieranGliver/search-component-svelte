import type { ClassOptions, ComponentOptions } from './interfaces.js';

export const classOptions: ClassOptions = {
	section: 'flex flex-col',
	label: 'font-semibold',
	input:
		'border-1 w-full rounded-md border-0 shadow-sm bg-gray-100 py-2.5 pl-5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm',
	container: '',
	ul: 'absolute z-50 -mb-2 mt-1 max-h-60 overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y divide-gray-100',
	li: 'z-50 cursor-default select-none py-2 px-2 lg:px-4 text-gray-900',
	li_selected: 'z-50 cursor-default select-none py-2 px-2 lg:px-4 bg-indigo-500 text-white',
	// TODO: Should render HTML
	p: 'font-semibold',
	p_container: 'flex justify-between gap-2'
};

export const componentOptions: ComponentOptions = {
	placeholder: 'Start typing...',
	limit: -1,
	label: '',
	classes: classOptions
};

export const validateOptions = (
	options: Partial<ComponentOptions> | undefined
): ComponentOptions => {
	const validatedOptions: ComponentOptions = { ...componentOptions };

	if (options && typeof options === 'object') {
		for (const key in validatedOptions) {
			if (key in options) {
				switch (key) {
					case 'placeholder':
						validatedOptions.placeholder = String(options.placeholder);
						break;
					case 'label':
						validatedOptions.label = String(options.label);
						break;
					case 'limit':
						validatedOptions.limit = Number(options.limit);
						break;
					case 'classes':
						if (options.classes && typeof options.classes === 'object') {
							validatedOptions.classes = {
								...componentOptions.classes,
								...(options.classes ?? {})
							};
						}
						break;
				}
			}
		}
	}
	return validatedOptions;
};
