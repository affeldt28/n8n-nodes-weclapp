import {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

export const sortQueryParameter: INodeProperties = {
	displayName: 'Sort',
	name: 'sort',
	type: 'fixedCollection',
	default: {},
	placeholder: 'Add Sort',
	typeOptions: {
		multipleValues: true,
	},
	options: [
		{
			displayName: 'Sort',
			name: 'criteria',
			values: [
				{
					displayName: 'Property',
					name: 'property',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'lastModifiedDate',
				},
				{
					displayName: 'Direction',
					name: 'direction',
					type: 'options',
					options: [
						{
							name: 'Ascending',
							value: 'asc',
						},
						{
							name: 'Descending',
							value: 'desc',
						},
					],
					default: 'asc',
				},
			],
		},
	],
	routing: {
		send: {
			preSend: [addSortQuery],
		},
	},
};

async function addSortQuery(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const sort = this.getNodeParameter('sort', {}) as IDataObject;
	const criteria = (sort.criteria ?? []) as Array<{ property?: string; direction?: string }>;
	const value = criteria
		.map(({ property, direction }) => {
			const trimmedProperty = property?.trim();
			if (!trimmedProperty) return '';
			return direction === 'desc' ? `-${trimmedProperty}` : trimmedProperty;
		})
		.filter(Boolean)
		.join(',');

	if (value) {
		requestOptions.qs = {
			...requestOptions.qs,
			sort: value,
		};
	}

	return requestOptions;
}
