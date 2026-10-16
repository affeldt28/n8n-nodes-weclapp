import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';
import { createUpdateProperties } from './shared.properties';

export const createOption: INodePropertyOptions = {
	name: 'Create',
	description: 'Create a webhook',
	value: 'create',
	routing: {
		request: {
			method: 'POST',
			url: '/webhook',
		},
	},
	action: 'Create a webhook',
};

const properties: INodeProperties[] = [dryRunQueryParameter, createUpdateProperties];

const displayOptions = {
	show: {
		resource: ['webhook'],
		operation: ['create'],
	},
};

export const createDescription = updateDisplayOptions(displayOptions, properties);
