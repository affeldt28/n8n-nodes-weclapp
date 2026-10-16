import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';

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

export const description = updateDisplayOptions(displayOptions, properties);
