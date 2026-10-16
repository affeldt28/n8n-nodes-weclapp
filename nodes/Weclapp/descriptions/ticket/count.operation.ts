import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { filterQueryParameters } from '../shared/QueryParameter';

export const countOption: INodePropertyOptions = {
	name: 'Count',
	description: 'Count tickets',
	value: 'count',
	routing: {
		request: {
			method: 'GET',
			url: '/ticket/count',
		},
	},
	action: 'Count tickets',
};

const properties: INodeProperties[] = [...filterQueryParameters];

const displayOptions = {
	show: {
		resource: ['ticket'],
		operation: ['count'],
	},
};

export const countDescription = updateDisplayOptions(displayOptions, properties);
