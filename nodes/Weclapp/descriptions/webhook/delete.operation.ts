import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';
import { webhookIdParameter } from './shared.properties';

export const deleteOption: INodePropertyOptions = {
	name: 'Delete',
	description: 'Delete a webhook',
	value: 'delete',
	routing: {
		request: {
			method: 'DELETE',
			url: '=/webhook/id/{{ $parameter.webhookId }}',
		},
	},
	action: 'Delete a webhook',
};

const properties: INodeProperties[] = [webhookIdParameter, dryRunQueryParameter];

const displayOptions = {
	show: {
		resource: ['webhook'],
		operation: ['delete'],
	},
};

export const deleteDescription = updateDisplayOptions(displayOptions, properties);
