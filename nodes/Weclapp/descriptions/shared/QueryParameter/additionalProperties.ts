import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

export const additionalPropertiesQueryParameter: INodeProperties = {
	displayName: 'Additional Properties',
	name: 'additionalProperties',
	type: 'fixedCollection',
	default: '',
	placeholder: 'Add Additional Property',
	typeOptions: {
		multipleValues: true,
	},
	options: [
		{
			displayName: 'Additional Property',
			name: 'items',
			values: [
				{
					displayName: 'Property Name',
					name: 'property',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'currentSalesPrice',
					description:
						'Additional calculated or complex property to include in the response',
				},
			],
		},
	],
	routing: {
		send: {
			preSend: [addAdditionalPropertiesQuery],
		},
	},
};

async function addAdditionalPropertiesQuery(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const additionalProperties = this.getNodeParameter('additionalProperties', {}) as IDataObject;
	const items = (additionalProperties.items ?? []) as Array<{ property?: string }>;
	const value = items
		.map(({ property }) => property?.trim())
		.filter((property): property is string => Boolean(property))
		.join(',');

	if (value) {
		requestOptions.qs = {
			...requestOptions.qs,
			additionalProperties: value,
		};
	}

	return requestOptions;
}
