import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { ticketIdParameter } from './shared.properties';

const properties: INodeProperties[] = [ticketIdParameter];

const displayOptions = {
	show: {
		resource: ['ticket'],
		operation: ['queryId'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
