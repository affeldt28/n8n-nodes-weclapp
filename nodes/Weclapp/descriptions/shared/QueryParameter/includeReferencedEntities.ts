import type { INodeProperties } from 'n8n-workflow';

export const includeReferencedEntitiesQueryParameter: INodeProperties = {
	name: 'includeReferencedEntities',
	displayName: 'Include Referenced Entities',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: '',
	placeholder: 'Add Referenced Entity',
	options: [
		{
			name: 'entity',
			displayName: 'Referenced Entity',
			values: [
				{
					name: 'name',
					displayName: 'Entity Name',
					type: 'string',
					default: '',
					placeholder: 'e.g.: customer',
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
