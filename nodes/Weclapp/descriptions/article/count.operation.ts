import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { filterQueryParameters } from '../shared/QueryParameter';

export const countOption: INodePropertyOptions = {
	name: 'Count',
	description: 'Count articles',
	value: 'count',
	routing: {
		request: {
			method: 'GET',
			url: '/article/count',
		},
	},
	action: 'Count articles',
};

const properties: INodeProperties[] = [...filterQueryParameters];

const displayOptions = {
	show: {
		resource: ['article'],
		operation: ['count'],
	},
};

export const countDescription = updateDisplayOptions(displayOptions, properties);
