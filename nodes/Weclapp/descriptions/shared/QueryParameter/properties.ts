import type { INodeProperties } from 'n8n-workflow';

export const propertiesQueryParameter: INodeProperties = {
	displayName: 'Properties',
	name: 'properties',
	type: 'fixedCollection',
	default: '',
	placeholder: 'Add Property',
	typeOptions: {
		multipleValues: true,
	},
	options: [
		{
			displayName: 'Property',
			name: 'items',
			values: [
				{
					displayName: 'Property Path',
					name: 'property',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'contacts.lastName',
					description: 'Property or nested property path to include in the response',
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
