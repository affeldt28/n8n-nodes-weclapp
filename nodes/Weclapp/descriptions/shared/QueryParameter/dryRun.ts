import type { INodeProperties } from 'n8n-workflow';

export const dryRunQueryParameter: INodeProperties = {
	displayName: 'Dry Run',
	name: 'dryRun',
	type: 'boolean',
	default: false,
	description: 'Whether to perform a dry run',
	routing: {
		send: {
			type: 'query',
			property: 'dryRun',
		},
	},
};
