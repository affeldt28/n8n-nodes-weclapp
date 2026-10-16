import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import {
	filterQueryParameters,
	optionsQueryParameter,
	paginationQueryParameters,
	sortQueryParameter,
} from '../shared/QueryParameter';

export const queryOption: INodePropertyOptions = {
	name: 'Get Many',
	description: 'Retrieve a list of webhooks',
	value: 'query',
	routing: {
		request: {
			method: 'GET',
			url: '/webhook',
		},
	},
	action: 'Get many webhooks',
};

const properties: INodeProperties[] = [
	...paginationQueryParameters,
	optionsQueryParameter,
	sortQueryParameter,
	...filterQueryParameters,
];

const displayOptions = {
	show: {
		resource: ['webhook'],
		operation: ['query'],
	},
};

export const queryDescription = updateDisplayOptions(displayOptions, properties);
