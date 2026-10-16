import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { ticketIdParameter } from './shared.properties';

export const queryIdOption: INodePropertyOptions = {
	name: 'Get',
	description: 'Retrieve a ticket',
	value: 'queryId',
	routing: {
		request: {
			method: 'GET',
			url: '=/ticket/id/{{ $parameter.ticketId }}',
		},
	},
	action: 'Get ticket',
};

const properties: INodeProperties[] = [ticketIdParameter];

const displayOptions = {
	show: {
		resource: ['ticket'],
		operation: ['queryId'],
	},
};

export const queryIdDescription = updateDisplayOptions(displayOptions, properties);
