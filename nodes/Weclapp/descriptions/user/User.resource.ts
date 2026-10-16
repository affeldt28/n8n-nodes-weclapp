import type { INodeProperties } from 'n8n-workflow';
import { countDescription, countOption } from './count.operation';
import { createDescription, createOption } from './create.operation';
import { queryDescription, queryOption } from './query.operation';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'count',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [countOption, createOption, queryOption],
	},
	...countDescription,
	...createDescription,
	...queryDescription,
];
