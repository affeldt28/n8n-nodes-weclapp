import { INodeProperties } from 'n8n-workflow';

export const includeReferencedEntitiesQueryParameter: INodeProperties = {
	// TODO: needs processing
	displayName: 'Include Referenced Entities',
	name: 'includeReferencedEntities',
	type: 'string',
	default: undefined,
	routing: {
		send: {
			type: 'query',
			property: 'includeReferencedEntities',
		},
	},
};
