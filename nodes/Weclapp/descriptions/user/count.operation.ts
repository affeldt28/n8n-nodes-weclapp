import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { filterQueryParameters } from '../shared/QueryParameter';

export const countOption: INodePropertyOptions = {
	name: 'Count',
	description: 'Count users',
	value: 'count',
	routing: {
		request: {
			method: 'GET',
			url: '/user/count',
		},
	},
	action: 'Count users',
};

const properties: INodeProperties[] = [...filterQueryParameters];

const displayOptions = {
	show: {
		resource: ['user'],
		operation: ['count'],
	},
};

export const countDescription = updateDisplayOptions(displayOptions, properties);
