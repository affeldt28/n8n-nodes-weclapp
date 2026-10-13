import type { INodeProperties } from 'n8n-workflow';

export const propertiesQueryParameter: INodeProperties = {
	displayName: 'Properties',
	name: 'properties',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
		fixedCollection: {
			itemTitle: '={{ $collection.item.value.property || "Property" }}',
		},
	},
	default: {},
	placeholder: 'Add Property',
	options: [
		{
			displayName: 'Property',
			name: 'items',
			values: [
				{
					displayName: 'Property Path',
					name: 'property',
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
				properties:
					'={{($parameter.options.properties?.items ?? []).map(item => item.property.trim()).filter(Boolean).join(",") || undefined}}',
			},
		},
	},
};
