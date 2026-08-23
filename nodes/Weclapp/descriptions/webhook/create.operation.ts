import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';
import { createUpdateProperties } from './shared';

const properties: INodeProperties[] = [dryRunQueryParameter, createUpdateProperties];

const displayOptions = {
	show: {
		resource: ['webhook'],
		operation: ['create'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
