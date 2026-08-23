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
				resource: ['webhook'],
			},
		},
		options: [
			{
				name: 'Get Many',
				description: 'Retrieve a list of webhooks',
				value: 'query',
				routing: {
					request: {
						method: 'GET',
						url: '/webhook',
					},
				},
				action: 'Get many webhooks',
			},
			{
				name: 'Count',
				description: 'Count webhooks',
				value: 'count',
				routing: {
					request: {
						method: 'GET',
						url: '/webhook/count',
					},
				},
				action: 'Count webhooks',
			},
			{
				name: 'Get',
				description: 'Retrieve a webhook',
				value: 'queryId',
				routing: {
					request: {
						method: 'GET',
						url: '=/webhook/id/{{ $parameter.webhookId.value }}',
					},
				},
				action: 'Get webhook',
			},
		],
	},
	...query.description,
	...count.description,
	...queryId.description,
];
