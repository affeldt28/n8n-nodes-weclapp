import type { INodeProperties } from 'n8n-workflow';

export const serializeNullsQueryParameter: INodeProperties = {
	name: 'serializeNulls',
	displayName: 'Serialize Nulls',
	description: 'Whether to include fields with null values in the response',
	type: 'boolean',
	default: false,
	routing: {
		send: {
			type: 'query',
			property: 'serializeNulls',
		},
	},
};
