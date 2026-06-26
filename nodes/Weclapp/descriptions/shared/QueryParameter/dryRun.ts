import type { INodeProperties } from 'n8n-workflow';

export const dryRunQueryParameter: INodeProperties = {
	name: 'dryRun',
	displayName: 'Dry Run',
	description: 'Whether to perform a dry run',
	type: 'boolean',
	default: false,
	routing: {
		send: {
			type: 'query',
			property: 'dryRun',
		},
	},
};
