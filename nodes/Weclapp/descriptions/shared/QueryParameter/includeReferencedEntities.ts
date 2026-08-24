import type { INodeProperties } from 'n8n-workflow';

export const includeReferencedEntitiesQueryParameter: INodeProperties = {
	displayName: 'Include Referenced Entities',
	name: 'includeReferencedEntities',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Referenced Entity',
	options: [
		{
			displayName: 'Referenced Entity',
			name: 'entity',
			values: [
				{
					displayName: 'Entity Name',
					name: 'name',
					type: 'string',
					default: '',
					placeholder: 'e.g. customer',
					required: true,
				},
			],
		},
	],
	routing: {
		request: {
			qs: {
				includeReferencedEntities:
					'={{$parameter.includeReferencedEntities.entity.map((e) => e.name).join(",")}}',
			},
		},
	},
};
