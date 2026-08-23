import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { webhookIdParameter } from './shared.properties';

const properties: INodeProperties[] = [webhookIdParameter];

const displayOptions = {
	show: {
		resource: ['webhook'],
		operation: ['queryId'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
