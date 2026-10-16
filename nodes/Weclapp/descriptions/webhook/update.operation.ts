import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';
import { createUpdateProperties, webhookIdParameter } from './shared.properties';

export const updateOption: INodePropertyOptions = {
	name: 'Update',
	description: 'Update a webhook',
	value: 'update',
	routing: {
		request: {
			method: 'PUT',
			url: '=/webhook/id/{{ $parameter.webhookId }}',
		},
	},
	action: 'Update a webhook',
};

const properties: INodeProperties[] = [
	webhookIdParameter,
	dryRunQueryParameter,
	createUpdateProperties,
];

const displayOptions = {
	show: {
		resource: ['webhook'],
		operation: ['update'],
	},
};

export const updateDescription = updateDisplayOptions(displayOptions, properties);
