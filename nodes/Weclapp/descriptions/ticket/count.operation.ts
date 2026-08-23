import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { filterQueryParameters } from '../shared/QueryParameter';

const properties: INodeProperties[] = [...filterQueryParameters];

const displayOptions = {
	show: {
		resource: ['ticket'],
		operation: ['count'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
