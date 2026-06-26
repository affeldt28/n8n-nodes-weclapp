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
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Count',
				description: 'Count Users',
				value: 'count',
				routing: {
					request: {
						method: 'GET',
						url: '/user/count',
					},
				},
				action: 'Count Users',
			},
			{
				name: 'Create',
				description: 'Create a user',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/user',
						headers: {
							'Content-Type': 'application/json',
						},
						json: true,
					},
				},
				action: 'Create a user',
			},
			{
				name: 'Query',
				description: 'Query Users',
				value: 'query',
				routing: {
					request: {
						method: 'GET',
						url: '/user',
					},
				},
				action: 'Query Users',
			},
		],
	},
	...count.description,
	...create.description,
	...query.description,
];
