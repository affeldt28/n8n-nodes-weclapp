import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';
import { createUpdateProperties } from './shared.properties';

export const createOption: INodePropertyOptions = {
	name: 'Create',
	description: 'Create a ticket',
	value: 'create',
	routing: {
		request: {
			method: 'POST',
			url: '/ticket',
		},
	},
	action: 'Create a ticket',
};

const properties: INodeProperties[] = [dryRunQueryParameter, createUpdateProperties];

const displayOptions = {
	show: {
		resource: ['ticket'],
		operation: ['create'],
	},
};

export const createDescription = updateDisplayOptions(displayOptions, properties);
