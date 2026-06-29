import type { INodeProperties } from 'n8n-workflow';
import * as count from './count.operation';
import * as query from './query.operation';
import * as queryId from './queryId.operation';

export const description: INodeProperties[] = [
	{
		name: 'operation',
		displayName: 'Operation',
		type: 'options',
		default: 'count',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['article'],
			},
		},
		options: [
			{
				name: 'Query',
				description: 'Query Articles',
				value: 'query',
				routing: {
					request: {
						method: 'GET',
						url: '/article',
					},
				},
				action: 'Query Articles',
			},
			{
				name: 'Count',
				description: 'Count Articles',
				value: 'count',
				routing: {
					request: {
						method: 'GET',
						url: '/article/count',
					},
				},
				action: 'Count Articles',
			},
			{
				name: 'Query by ID',
				description: 'Query Article by ID',
				value: 'queryId',
				routing: {
					request: {
						method: 'GET',
						url: '=/article/id/{{ $parameter.articleId }}',
					},
				},
				action: 'Query Article by ID',
			},
		],
	},
	...query.description,
	...count.description,
	...queryId.description,
];
