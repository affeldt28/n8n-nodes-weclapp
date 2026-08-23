import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';
import { createUpdateProperties, ticketIdParameter } from './shared.properties';

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

export const description = updateDisplayOptions(displayOptions, properties);
