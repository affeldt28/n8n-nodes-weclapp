import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';
import { filterQueryParameters } from '../shared/QueryParameter';

export const countOption: INodePropertyOptions = {
	name: 'Count',
	description: 'Count recurring invoices',
	value: 'count',
	routing: {
		request: {
			method: 'GET',
			url: '/recurringInvoice/count',
		},
	},
	action: 'Count recurring invoices',
};

const properties: INodeProperties[] = [...filterQueryParameters];

const displayOptions = {
	show: {
		resource: ['recurringInvoice'],
		operation: ['count'],
	},
};

export const countDescription = updateDisplayOptions(displayOptions, properties);
