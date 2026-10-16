import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';

export const queryIdOption: INodePropertyOptions = {
	name: 'Get',
	description: 'Retrieve an article',
	value: 'queryId',
	routing: {
		request: {
			method: 'GET',
			url: '=/article/id/{{ $parameter.articleId }}',
		},
	},
	action: 'Get article',
};

const properties: INodeProperties[] = [
	{
		displayName: 'Article ID',
		name: 'articleId',
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

export const queryIdDescription = updateDisplayOptions(displayOptions, properties);
