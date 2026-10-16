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
			countOption,
			createOption,
			deleteOption,
			queryIdOption,
			queryOption,
			updateOption,
		],
	},
	...queryDescription,
	...createDescription,
	...countDescription,
	...queryIdDescription,
	...updateDescription,
	...deleteDescription,
];
