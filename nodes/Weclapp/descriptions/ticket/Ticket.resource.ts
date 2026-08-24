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
			{
				name: 'Count',
				description: 'Count tickets',
				value: 'count',
				routing: {
					request: {
						method: 'GET',
						url: '/ticket/count',
					},
				},
				action: 'Count tickets',
			},
			{
				name: 'Create',
				description: 'Create a ticket',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/ticket',
					},
				},
				action: 'Create a ticket',
			},
			{
				name: 'Delete',
				description: 'Delete a ticket',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/ticket/id/{{ $parameter.ticketId.value }}',
					},
				},
				action: 'Delete a ticket',
			},
			{
				name: 'Get',
				description: 'Retrieve a ticket',
				value: 'queryId',
				routing: {
					request: {
						method: 'GET',
						url: '=/ticket/id/{{ $parameter.ticketId.value }}',
					},
				},
				action: 'Get ticket',
			},
			{
				name: 'Get Many',
				description: 'Retrieve a list of tickets',
				value: 'query',
				routing: {
					request: {
						method: 'GET',
						url: '/ticket',
					},
				},
				action: 'Get many tickets',
			},
			{
				name: 'Update',
				description: 'Update a ticket',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: '=/ticket/id/{{ $parameter.ticketId.value }}',
					},
				},
				action: 'Update a ticket',
			},
		],
	},
	...count.description,
	...create.description,
	...delete_.description,
	...query.description,
	...queryId.description,
	...update.description,
];
