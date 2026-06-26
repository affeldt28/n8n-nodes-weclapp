import type { INodeProperties } from 'n8n-workflow';
import * as count from './count.operation';
import * as query from './query.operation';

export const description: INodeProperties[] = [
	{
		displayName:
			"Caution: This is an unofficial implementation of the weclapp API. The following operations are implemented. But it's not officially documented in the weclapp API documentation. Use at your own risk.",
		name: 'recurringInvoiceCaution',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['recurringInvoice'],
			},
		},
	},
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
