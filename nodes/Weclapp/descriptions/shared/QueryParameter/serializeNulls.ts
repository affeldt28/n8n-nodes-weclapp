import type { INodeProperties } from 'n8n-workflow';

export const serializeNullsQueryParameter: INodeProperties = {
	displayName: 'Serialize Nulls',
	name: 'serializeNulls',
	type: 'boolean',
	default: false,
	description: 'Whether to include fields with null values in the response',
	routing: {
		send: {
			type: 'query',
			property: 'serializeNulls',
		},
	},
};
