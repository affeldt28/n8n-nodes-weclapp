import type { INodeProperties } from 'n8n-workflow';
import * as count from './count.operation';
import * as query from './query.operation';
import * as queryId from './queryId.operation';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['article'],
			},
		},
		options: [
			{
				name: 'Count',
				value: 'count',
				description: 'Count Articles',
				routing: {
					request: {
						method: 'GET',
						url: '/article/count',
					},
				},
				action: 'Count Articles',
			},
			{
				name: 'Query',
				value: 'query',
				description: 'Query Articles',
				routing: {
					request: {
						method: 'GET',
						url: '/article',
					},
				},
				action: 'Query Articles',
			},
			{
				name: 'Query by ID',
				value: 'queryId',
				description: 'Query Article by ID',
				routing: {
					request: {
						method: 'GET',
						url: '/article/id/{{ $parameter["articleId"] }}',
					},
				},
				action: 'Query Article by ID',
			},
		],
		default: 'count',
	},
	...count.description,
	...query.description,
	...queryId.description,
];
