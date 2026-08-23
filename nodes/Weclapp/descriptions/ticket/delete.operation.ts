import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';
import { ticketIdParameter } from './shared.properties';

const properties: INodeProperties[] = [ticketIdParameter, dryRunQueryParameter];

const displayOptions = {
	show: {
		resource: ['ticket'],
		operation: ['delete'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
