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
				description: 'Count users',
				value: 'count',
				routing: {
					request: {
						method: 'GET',
						url: '/user/count',
					},
				},
				action: 'Count users',
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
				action: 'Create user',
			},
			{
				name: 'Get Many',
				description: 'Retrieve a list of users',
				value: 'query',
				routing: {
					request: {
						method: 'GET',
						url: '/user',
					},
				},
				action: 'Get many users',
			},
		],
	},
	...count.description,
	...create.description,
	...query.description,
];
