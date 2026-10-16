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
	description: 'Retrieve a list of parties',
	value: 'query',
	routing: {
		request: {
			method: 'GET',
			url: '/party',
		},
	},
	action: 'Get many parties',
};

const properties: INodeProperties[] = [
	...paginationQueryParameters,
	optionsQueryParameter,
	sortQueryParameter,
	...filterQueryParameters,
];

const displayOptions = {
	show: {
		resource: ['party'],
		operation: ['query'],
	},
};

export const queryDescription = updateDisplayOptions(displayOptions, properties);
