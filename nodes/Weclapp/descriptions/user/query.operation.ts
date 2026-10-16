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
	description: 'Retrieve a list of users',
	value: 'query',
	routing: {
		request: {
			method: 'GET',
			url: '/user',
		},
	},
	action: 'Get many users',
};

const properties: INodeProperties[] = [
	...paginationQueryParameters,
	optionsQueryParameter,
	sortQueryParameter,
	...filterQueryParameters,
];

const displayOptions = {
	show: {
		resource: ['user'],
		operation: ['query'],
	},
};

export const queryDescription = updateDisplayOptions(displayOptions, properties);
