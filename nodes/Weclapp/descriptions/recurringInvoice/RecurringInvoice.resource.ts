import type { INodeProperties } from 'n8n-workflow';
import * as count from './count.operation';
import * as query from './query.operation';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['recurringInvoice'],
			},
		},
		options: [
			{
				name: 'Count',
				value: 'count',
				description: 'Count Recurring Invoices',
				routing: {
					request: {
						method: 'GET',
						url: '/recurringInvoice/count',
					},
				},
				action: 'Count Recurring Invoices',
			},
			{
				name: 'Query',
				value: 'query',
				description: 'Query Recurring Invoices',
				routing: {
					request: {
						method: 'GET',
						url: '/recurringInvoice',
					},
				},
				action: 'Query Recurring Invoices',
			},
		],
		default: 'count',
	},
	...count.description,
	...query.description,
];
