import type { INodeProperties } from 'n8n-workflow';
import * as count from './count.operation';
import * as query from './query.operation';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['party'],
			},
		},
		options: [
			{
				name: 'Count',
				value: 'count',
				description: 'Count Parties',
				routing: {
					request: {
						method: 'GET',
						url: '/party/count',
					},
				},
				action: 'Count Parties',
			},
			{
				name: 'Query',
				value: 'query',
				description: 'Query Parties',
				routing: {
					request: {
						method: 'GET',
						url: '/party',
					},
				},
				action: 'Query Parties',
			},
		],
		default: 'count',
	},
	...count.description,
	...query.description,
];
