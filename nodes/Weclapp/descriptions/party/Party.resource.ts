import type { INodeProperties } from 'n8n-workflow';
import * as count from './count.operation';
import * as create from './create.operation';
import * as query from './query.operation';

export const description: INodeProperties[] = [
	{
		name: 'operation',
		displayName: 'Operation',
		type: 'options',
		default: 'count',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['party'],
			},
		},
		options: [
			{
				name: 'Query',
				description: 'Query Parties',
				value: 'query',
				routing: {
					request: {
						method: 'GET',
						url: '/party',
					},
				},
				action: 'Query Parties',
			},
			{
				name: 'Create',
				description: 'Create a Party',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/party',
					},
				},
				action: 'Create Parties',
			},
			{
				name: 'Count',
				description: 'Count Parties',
				value: 'count',
				routing: {
					request: {
						method: 'GET',
						url: '/party/count',
					},
				},
				action: 'Count Parties',
			},
		],
	},
	...query.description,
	...create.description,
	...count.description,
];
