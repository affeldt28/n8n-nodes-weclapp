import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { filterQueryParameter } from '../shared/QueryParameter';

const properties: INodeProperties[] = [filterQueryParameter];

const displayOptions = {
	show: {
		resource: ['user'],
		operation: ['count'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
