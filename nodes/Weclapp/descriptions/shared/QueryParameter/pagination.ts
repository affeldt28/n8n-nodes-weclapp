import { INodeProperties } from 'n8n-workflow';

export const pageQueryParameter: INodeProperties = {
	displayName: 'Page',
	name: 'page',
	type: 'number',
	typeOptions: {
		minValue: 1,
	},
	default: undefined,
	description: 'The page number to retrieve',
	routing: {
		send: {
			type: 'query',
			property: 'page',
		},
	},
};

export const pageSizeQueryParameter: INodeProperties = {
	displayName: 'Page Size',
	name: 'pageSize',
	type: 'number',
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
	default: undefined,
	description: 'The number of items to retrieve per page',
	routing: {
		send: {
			type: 'query',
			property: 'pageSize',
		},
	},
};

export const offsetQueryParameter: INodeProperties = {
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	typeOptions: {
		minValue: 0,
	},
	default: undefined,
	description: 'The number of items to skip before starting to collect the result set',
	routing: {
		send: {
			type: 'query',
			property: 'offset',
		},
	},
};
