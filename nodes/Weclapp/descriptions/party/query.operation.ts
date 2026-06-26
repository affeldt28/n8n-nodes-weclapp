import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import {
	filterQueryParameters,
	includeReferencedEntitiesQueryParameter,
	paginationQueryParameters,
	propertiesQueryParameter,
	serializeNullsQueryParameter,
	sortQueryParameter,
} from '../shared/QueryParameter';

const properties: INodeProperties[] = [
	...paginationQueryParameters,
	serializeNullsQueryParameter,
	sortQueryParameter,
	...filterQueryParameters,
	propertiesQueryParameter,
	includeReferencedEntitiesQueryParameter,
];

const displayOptions = {
	show: {
		resource: ['party'],
		operation: ['query'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
