import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';
import { webhookIdParameter } from './shared.properties';

const properties: INodeProperties[] = [webhookIdParameter, dryRunQueryParameter];

const displayOptions = {
	show: {
		resource: ['webhook'],
		operation: ['delete'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
