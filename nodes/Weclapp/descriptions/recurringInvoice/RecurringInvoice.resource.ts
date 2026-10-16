import type { INodeProperties } from 'n8n-workflow';
import { countDescription, countOption } from './count.operation';
import { queryDescription, queryOption } from './query.operation';

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
		default: 'count',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['recurringInvoice'],
			},
		},
		options: [queryOption, countOption],
	},
	...queryDescription,
	...countDescription,
];
