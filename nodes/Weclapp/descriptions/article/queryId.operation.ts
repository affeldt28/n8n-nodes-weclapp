import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';

const properties: INodeProperties[] = [
	{
		name: 'articleId',
		displayName: 'Article ID',
		type: 'resourceLocator',
		default: {
			mode: 'id',
			value: '',
		},
		modes: [
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e.g. 12345',
			},
		],
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
