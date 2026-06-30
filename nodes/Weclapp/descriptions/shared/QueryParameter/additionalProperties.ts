import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

/**
 * @deprecated ⚠️ UNTESTED: This function is not tested and may not work as expected. Use with caution.
 */
export const additionalPropertiesQueryParameter: INodeProperties = {
	name: 'additionalProperties',
	displayName: 'Additional Properties',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: '',
	placeholder: 'Add Additional Property',
	options: [
		{
			name: 'items',
			displayName: 'Additional Property',
			values: [
				{
					name: 'property',
					displayName: 'Property Name',
					description:
						'Additional calculated or complex property to include in the response',
					type: 'string',
					default: '',
					placeholder: 'e.g. currentSalesPrice',
					required: true,
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
