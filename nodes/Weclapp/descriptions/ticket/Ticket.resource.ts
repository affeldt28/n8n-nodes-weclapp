import type { INodeProperties } from 'n8n-workflow';
import { countDescription, countOption } from './count.operation';
import { createDescription, createOption } from './create.operation';
import { deleteDescription, deleteOption } from './delete.operation';
import { queryDescription, queryOption } from './query.operation';
import { queryIdDescription, queryIdOption } from './queryId.operation';
import { updateDescription, updateOption } from './update.operation';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'count',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
			},
		},
		options: [
			countOption,
			createOption,
			deleteOption,
			queryIdOption,
			queryOption,
			updateOption,
		],
	},
	...countDescription,
	...createDescription,
	...deleteDescription,
	...queryDescription,
	...queryIdDescription,
	...updateDescription,
];
