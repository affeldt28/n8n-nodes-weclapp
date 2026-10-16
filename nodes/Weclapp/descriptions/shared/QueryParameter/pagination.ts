import type {
	DeclarativeRestApiSettings,
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
		const results = response.flatMap((item) => {
			if (!Array.isArray(item.json.result)) {
				throw new Error('Cannot paginate Weclapp results: expected a result array');
			}
			return item.json.result.map((json) => ({ ...item, json }));
		});
		items.push(...results);
		if (results.length < pageSize) return items;
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
