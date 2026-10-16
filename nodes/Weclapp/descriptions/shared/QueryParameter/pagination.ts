import type {
	DeclarativeRestApiSettings,
	IDataObject,
	IExecutePaginationFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';

export async function paginateAll(
	this: IExecutePaginationFunctions,
	requestOptions: DeclarativeRestApiSettings.ResultOptions,
): Promise<INodeExecutionData[]> {
	const items: INodeExecutionData[] = [];
	const pageSize = 100;
	// Return All always starts at the beginning, regardless of saved manual settings.
	const query = { ...(requestOptions.options.qs ?? {}) };
	delete query.page;
	delete query.pageSize;
	delete query.offset;

	for (let page = 1; ; page++) {
		requestOptions.options.qs = { ...query, page, pageSize };
		const response = await this.makeRoutingRequest(requestOptions);
		let resultCount = 0;
		for (const item of response) {
			if (!Array.isArray(item.json.result)) {
				throw new Error('Cannot paginate Weclapp results: expected a result array');
			}
			resultCount += item.json.result.length;
			if (items.length === 0) {
				items.push({ ...item, json: { ...item.json } });
				continue;
			}
			const combined = items[0].json;
			for (const [key, value] of Object.entries(item.json)) {
				if (Array.isArray(value)) {
					const previous = combined[key];
					combined[key] = [...(Array.isArray(previous) ? previous : []), ...value];
				} else if (key === 'additionalProperties' && value && typeof value === 'object') {
					const previous = combined[key];
					const properties: IDataObject = {
						...(previous && typeof previous === 'object' && !Array.isArray(previous)
							? previous
							: {}),
					};
					for (const [name, values] of Object.entries(value)) {
						if (Array.isArray(values)) {
							const existing = properties[name];
							properties[name] = [
								...(Array.isArray(existing) ? existing : []),
								...values,
							];
						} else if (!(name in properties)) {
							properties[name] = values;
						}
					}
					combined[key] = properties;
				} else if (!(key in combined)) {
					combined[key] = value;
				}
			}
		}
		if (resultCount < pageSize) return items;
	}
}

export const paginationQueryParameters: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		description: 'Whether to return all results or only up to a given limit',
		type: 'boolean',
		default: false,
		routing: {
			send: { paginate: '={{ $parameter.returnAll }}' },
			operations: { pagination: paginateAll },
		},
	},
	{
		displayName: 'Use Pagination',
		name: 'usePagination',
		description: 'Whether to use pagination for the request',
		displayOptions: { show: { returnAll: [false] } },
		type: 'boolean',
		default: false,
	},
	{
		displayName: 'Page',
		name: 'page',
		description: 'The page number to retrieve',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		placeholder: 'e.g. 1',
		displayOptions: {
			show: {
				usePagination: [true],
				returnAll: [false],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'page',
			},
		},
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		description: 'The number of items to retrieve per page',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 100,
		placeholder: 'e.g. 100',
		displayOptions: {
			show: {
				usePagination: [true],
				returnAll: [false],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'pageSize',
			},
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		description: 'The number of items to skip before starting to collect the result set',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		placeholder: 'e.g. 0',
		displayOptions: {
			show: {
				usePagination: [true],
				returnAll: [false],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'offset',
			},
		},
	},
];
