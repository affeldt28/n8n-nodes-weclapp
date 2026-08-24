import type { INodeProperties } from 'n8n-workflow';
import { includeReferencedEntitiesQueryParameter } from './includeReferencedEntities';
import { propertiesQueryParameter } from './properties';
import { serializeNullsQueryParameter } from './serializeNulls';

export const optionsQueryParameter: INodeProperties = {
	displayName: 'Options',
	name: 'options',
	type: 'collection',
	default: {},
	placeholder: 'Add Option',
	options: [
		serializeNullsQueryParameter,
		propertiesQueryParameter,
		includeReferencedEntitiesQueryParameter,
	],
};
