import type { INodeProperties } from 'n8n-workflow';
import { includeReferencedEntitiesQueryParameter } from './includeReferencedEntities';
import { propertiesQueryParameter } from './properties';
import { serializeNullsQueryParameter } from './serializeNulls';

export const optionsQueryParameter: INodeProperties = {
	name: 'options',
	displayName: 'Options',
	type: 'collection',
	default: {},
	placeholder: 'Add Option',
	options: [
		serializeNullsQueryParameter,
		propertiesQueryParameter,
		includeReferencedEntitiesQueryParameter,
	],
};
