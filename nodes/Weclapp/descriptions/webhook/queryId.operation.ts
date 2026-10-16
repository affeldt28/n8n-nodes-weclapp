import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { webhookIdParameter } from './shared.properties';

export const queryIdOption: INodePropertyOptions = {
	name: 'Get',
	description: 'Retrieve a webhook',
	value: 'queryId',
	routing: {
		request: {
			method: 'GET',
			url: '=/webhook/id/{{ $parameter.webhookId }}',
		},
	},
	action: 'Get webhook',
};

const properties: INodeProperties[] = [webhookIdParameter];

const displayOptions = {
	show: {
		resource: ['webhook'],
		operation: ['queryId'],
	},
};

export const queryIdDescription = updateDisplayOptions(displayOptions, properties);
