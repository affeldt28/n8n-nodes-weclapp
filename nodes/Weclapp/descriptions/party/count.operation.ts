import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { filterQueryParameters } from '../shared/QueryParameter';

export const countOption: INodePropertyOptions = {
	name: 'Count',
	description: 'Count parties',
	value: 'count',
	routing: {
		request: {
			method: 'GET',
			url: '/party/count',
		},
	},
	action: 'Count parties',
};

const properties: INodeProperties[] = [...filterQueryParameters];

const displayOptions = {
	show: {
		resource: ['party'],
		operation: ['count'],
	},
};

export const countDescription = updateDisplayOptions(displayOptions, properties);
