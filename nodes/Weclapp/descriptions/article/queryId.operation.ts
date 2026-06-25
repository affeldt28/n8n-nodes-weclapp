import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';

const properties: INodeProperties[] = [];

const displayOptions = {
	show: {
		resource: ['article'],
		operation: ['queryId'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
