import type { INodeProperties } from 'n8n-workflow';
import * as count from './count.operation';
import * as create from './create.operation';
import * as query from './query.operation';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Count',
				value: 'count',
				description: 'Count Users',
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
				value: 'create',
				description: 'Create a user',
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
				value: 'query',
				description: 'Query Users',
				routing: {
					request: {
						method: 'GET',
						url: '/user',
					},
				},
				action: 'Query Users',
			},
		],
		default: 'count',
	},
	...count.description,
	...create.description,
	...query.description,
];
