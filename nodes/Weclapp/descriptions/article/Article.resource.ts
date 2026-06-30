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
				name: 'Get Many',
				description: 'Retrieve a list of articles',
				value: 'query',
				routing: {
					request: {
						method: 'GET',
						url: '/article',
					},
				},
				action: 'Get many articles',
			},
			{
				name: 'Count',
				description: 'Count articles',
				value: 'count',
				routing: {
					request: {
						method: 'GET',
						url: '/article/count',
					},
				},
				action: 'Count articles',
			},
			{
				name: 'Get',
				description: 'Retrieve an article',
				value: 'queryId',
				routing: {
					request: {
						method: 'GET',
						url: '=/article/id/{{ $parameter.articleId.value }}',
					},
				},
				action: 'Get article',
			},
		],
	},
	...query.description,
	...count.description,
	...queryId.description,
];
