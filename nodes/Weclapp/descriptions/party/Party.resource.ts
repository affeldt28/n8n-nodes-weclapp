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
				name: 'Get Many',
				description: 'Retrieve a list of parties',
				value: 'query',
				routing: {
					request: {
						method: 'GET',
						url: '/party',
					},
				},
				action: 'Get many parties',
			},
			{
				name: 'Create',
				description: 'Create a party',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/party',
					},
				},
				action: 'Create party',
			},
			{
				name: 'Count',
				description: 'Count parties',
				value: 'count',
				routing: {
					request: {
						method: 'GET',
						url: '/party/count',
					},
				},
				action: 'Count parties',
			},
		],
	},
	...query.description,
	...create.description,
	...count.description,
];
