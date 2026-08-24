import { INodeProperties } from 'n8n-workflow';

export const paginationQueryParameters: INodeProperties[] = [
	{
		displayName: 'Use Pagination',
		name: 'usePagination',
		description: 'Whether to use pagination for the request',
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
