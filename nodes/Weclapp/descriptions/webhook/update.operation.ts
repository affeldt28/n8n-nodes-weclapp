import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';
import { createUpdateProperties, webhookIdParameter } from './shared.properties';

const properties: INodeProperties[] = [
	webhookIdParameter,
	dryRunQueryParameter,
	createUpdateProperties,
];

const displayOptions = {
	show: {
		resource: ['webhook'],
		operation: ['update'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
