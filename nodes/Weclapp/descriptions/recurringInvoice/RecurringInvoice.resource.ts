import type { INodeProperties } from 'n8n-workflow';
import * as count from './count.operation';
import * as query from './query.operation';

export const description: INodeProperties[] = [
	{
		name: 'recurringInvoiceCaution',
		displayName:
			"Caution: This is an unofficial implementation of the weclapp API. The following operations are implemented. But it's not officially documented in the weclapp API documentation. Use at your own risk.",
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['recurringInvoice'],
			},
		},
	},
	{
		name: 'operation',
		displayName: 'Operation',
		type: 'options',
		default: 'count',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['recurringInvoice'],
			},
		},
		options: [
			{
				name: 'Query',
				description: 'Query Recurring Invoices',
				value: 'query',
				routing: {
					request: {
						method: 'GET',
						url: '/recurringInvoice',
					},
				},
				action: 'Query Recurring Invoices',
			},
			{
				name: 'Count',
				description: 'Count Recurring Invoices',
				value: 'count',
				routing: {
					request: {
						method: 'GET',
						url: '/recurringInvoice/count',
					},
				},
				action: 'Count Recurring Invoices',
			},
		],
	},
	...query.description,
	...count.description,
];
