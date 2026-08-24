import type { INodeProperties } from 'n8n-workflow';
import * as count from './count.operation';
import * as create from './create.operation';
import * as delete_ from './delete.operation';
import * as query from './query.operation';
import * as queryId from './queryId.operation';
import * as update from './update.operation';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		type: 'options',
		name: 'operation',
		default: 'count',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
			},
		},
		options: [
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
				name: 'Create',
				description: 'Create a webhook',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/webhook',
					},
				},
				action: 'Create a webhook',
			},
			{
				name: 'Delete',
				description: 'Delete a webhook',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/webhook/id/{{ $parameter.webhookId.value }}',
					},
				},
				action: 'Delete a webhook',
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
				name: 'Update',
				description: 'Update a webhook',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: '=/webhook/id/{{ $parameter.webhookId.value }}',
					},
				},
				action: 'Update a webhook',
			},
		],
	},
	...query.description,
	...create.description,
	...count.description,
	...queryId.description,
	...update.description,
	...delete_.description,
];
