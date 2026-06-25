import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

export const propertiesQueryParameter: INodeProperties = {
	displayName: 'Properties',
	name: 'properties',
	type: 'fixedCollection',
	default: '',
	placeholder: 'Add Property',
	typeOptions: {
		multipleValues: true,
	},
	options: [
		{
			displayName: 'Property',
			name: 'items',
			values: [
				{
					displayName: 'Property Path',
					name: 'property',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'contacts.lastName',
					description: 'Property or nested property path to include in the response',
				},
			],
		},
	],
	routing: {
		send: {
			preSend: [addPropertiesQuery],
		},
	},
};

async function addPropertiesQuery(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const properties = this.getNodeParameter('properties', {}) as IDataObject;
	const items = (properties.items ?? []) as Array<{ property?: string }>;
	const value = items
		.map(({ property }) => property?.trim())
		.filter((property): property is string => Boolean(property))
		.join(',');

	if (value) {
		requestOptions.qs = {
			...requestOptions.qs,
			properties: value,
		};
	}

	return requestOptions;
}
