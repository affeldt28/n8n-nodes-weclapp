import type { INodeProperties } from 'n8n-workflow';

export const propertiesQueryParameter: INodeProperties = {
	name: 'properties',
	displayName: 'Properties',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Property',
	options: [
		{
			name: 'items',
			displayName: 'Property',
			values: [
				{
					name: 'property',
					displayName: 'Property Path',
					description: 'Property or nested property path to include in the response',
					type: 'string',
					default: '',
					placeholder: 'e.g. contacts.lastName',
					required: true,
				},
			],
		},
	],
	routing: {
		request: {
			qs: {
				properties: '={{$parameter.properties.items.map(item => item.property).join(",")}}',
			},
		},
	},
};
