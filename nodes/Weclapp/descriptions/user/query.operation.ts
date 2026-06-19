import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import {
	filterQueryParameter,
	includeReferencedEntitiesQueryParameter,
	offsetQueryParameter,
	pageQueryParameter,
	pageSizeQueryParameter,
	propertiesQueryParameter,
	serializeNullsQueryParameter,
	sortQueryParameter,
} from '../shared/QueryParameter';

const properties: INodeProperties[] = [
	offsetQueryParameter,
	pageQueryParameter,
	pageSizeQueryParameter,
	serializeNullsQueryParameter,
	sortQueryParameter,
	filterQueryParameter,
	propertiesQueryParameter,
	includeReferencedEntitiesQueryParameter,
];

const displayOptions = {
	show: {
		resource: ['user'],
		operation: ['query'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
