import type { INodeProperties } from 'n8n-workflow';

export const includeReferencedEntitiesQueryParameter: INodeProperties = {
	displayName: 'Include Referenced Entities',
	name: 'includeReferencedEntities',
	type: 'fixedCollection',
	default: '',
	placeholder: 'Add Referenced Entity',
	typeOptions: {
		multipleValues: true,
	},
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
					required: true,
					placeholder: 'e.g.: customer',
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
