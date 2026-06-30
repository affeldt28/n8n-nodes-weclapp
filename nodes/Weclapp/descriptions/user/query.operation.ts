import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import {
	filterQueryParameters,
	optionsQueryParameter,
	paginationQueryParameters,
	sortQueryParameter,
} from '../shared/QueryParameter';

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

export const description = updateDisplayOptions(displayOptions, properties);
