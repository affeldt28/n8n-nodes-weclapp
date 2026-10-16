import {
	type INodeProperties,
	type INodePropertyOptions,
	updateDisplayOptions,
} from 'n8n-workflow';

export const queryIdOption: INodePropertyOptions = {
	name: 'Get',
	description: 'Retrieve a party',
	value: 'queryId',
	routing: {
		request: {
			method: 'GET',
			url: '=/party/id/{{ $parameter.partyId }}',
		},
	},
	action: 'Get party',
};

const properties: INodeProperties[] = [
	{
		displayName: 'Party ID',
		name: 'partyId',
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
		resource: ['party'],
		operation: ['queryId'],
	},
};

export const queryIdDescription = updateDisplayOptions(displayOptions, properties);
