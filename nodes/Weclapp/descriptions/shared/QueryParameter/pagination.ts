import { INodeProperties } from 'n8n-workflow';

export const paginationQueryParameters: INodeProperties[] = [
	{
		displayName: 'Use Pagination',
		name: 'usePagination',
		type: 'boolean',
		default: false,
		description: 'Whether to use pagination for the request',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		placeholder: '1',
		default: 1,
		description: 'The page number to retrieve',
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
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		placeholder: '100',
		default: 100,
		description: 'The number of items to retrieve per page',
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
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		placeholder: '0',
		default: 0,
		description: 'The number of items to skip before starting to collect the result set',
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
