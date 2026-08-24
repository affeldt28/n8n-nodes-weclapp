import type { INodeProperties } from 'n8n-workflow';

export const dryRunQueryParameter: INodeProperties = {
	displayName: 'Dry Run',
	name: 'dryRun',
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
