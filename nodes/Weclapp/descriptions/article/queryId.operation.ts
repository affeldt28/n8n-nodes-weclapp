import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';

const properties: INodeProperties[] = [
	{
		name: 'articleId',
		displayName: 'Article ID',
		type: 'string',
		default: '',
		required: true,
	},
];

const displayOptions = {
	show: {
		resource: ['article'],
		operation: ['queryId'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
