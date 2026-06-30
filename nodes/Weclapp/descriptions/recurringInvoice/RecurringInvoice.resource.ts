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
				name: 'Get Many',
				description: 'Retrieve a list of recurring invoices',
				value: 'query',
				routing: {
					request: {
						method: 'GET',
						url: '/recurringInvoice',
					},
				},
				action: 'Get many recurring invoices',
			},
			{
				name: 'Count',
				description: 'Count recurring invoices',
				value: 'count',
				routing: {
					request: {
						method: 'GET',
						url: '/recurringInvoice/count',
					},
				},
				action: 'Count recurring invoices',
			},
		],
	},
	...query.description,
	...count.description,
];
