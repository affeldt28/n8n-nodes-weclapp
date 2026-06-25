import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import {
	additionalPropertiesQueryParameter,
	filterQueryParameters,
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
	...filterQueryParameters,
	propertiesQueryParameter,
	includeReferencedEntitiesQueryParameter,
	additionalPropertiesQueryParameter,
];

const displayOptions = {
	show: {
		resource: ['recurringInvoice'],
		operation: ['query'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
