import { INodeProperties } from 'n8n-workflow';

export const paginationQueryParameters: INodeProperties[] = [
	{
		name: 'usePagination',
		displayName: 'Use Pagination',
		description: 'Whether to use pagination for the request',
		type: 'boolean',
		default: false,
	},
	{
		name: 'page',
		displayName: 'Page',
		description: 'The page number to retrieve',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		placeholder: '1',
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
		name: 'pageSize',
		displayName: 'Page Size',
		description: 'The number of items to retrieve per page',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 100,
		placeholder: '100',
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
		name: 'offset',
		displayName: 'Offset',
		description: 'The number of items to skip before starting to collect the result set',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		placeholder: '0',
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
