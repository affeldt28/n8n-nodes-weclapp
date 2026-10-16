import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';
import { createUpdateProperties, ticketIdParameter } from './shared.properties';

export const updateOption: INodePropertyOptions = {
	name: 'Update',
	description: 'Update a ticket',
	value: 'update',
	routing: {
		request: {
			method: 'PUT',
			url: '=/ticket/id/{{ $parameter.ticketId }}',
			qs: {
				ignoreMissingProperties: true,
			},
		},
	},
	action: 'Update a ticket',
};

const properties: INodeProperties[] = [
	ticketIdParameter,
	dryRunQueryParameter,
	createUpdateProperties,
];

const displayOptions = {
	show: {
		resource: ['ticket'],
		operation: ['update'],
	},
};

export const updateDescription = updateDisplayOptions(displayOptions, properties);
