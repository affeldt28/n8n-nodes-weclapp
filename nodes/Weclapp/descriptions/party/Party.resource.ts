import type { INodeProperties } from 'n8n-workflow';
import { countDescription, countOption } from './count.operation';
import { createDescription, createOption } from './create.operation';
import { queryDescription, queryOption } from './query.operation';
import { queryIdDescription, queryIdOption } from './queryId.operation';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'count',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['party'],
			},
		},
		options: [queryIdOption, queryOption, createOption, countOption],
	},
	...queryDescription,
	...queryIdDescription,
	...createDescription,
	...countDescription,
];
