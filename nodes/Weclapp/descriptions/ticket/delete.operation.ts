import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';
import { ticketIdParameter } from './shared.properties';

export const deleteOption: INodePropertyOptions = {
	name: 'Delete',
	description: 'Delete a ticket',
	value: 'delete',
	routing: {
		request: {
			method: 'DELETE',
			url: '=/ticket/id/{{ $parameter.ticketId }}',
		},
	},
	action: 'Delete a ticket',
};

const properties: INodeProperties[] = [ticketIdParameter, dryRunQueryParameter];

const displayOptions = {
	show: {
		resource: ['ticket'],
		operation: ['delete'],
	},
};

export const deleteDescription = updateDisplayOptions(displayOptions, properties);
