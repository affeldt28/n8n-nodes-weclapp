import { INodeProperties } from 'n8n-workflow';

export const sortQueryParameter: INodeProperties = {
	displayName: 'Sort',
	name: 'sort',
	type: 'fixedCollection',
	default: '',
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
		request: {
			qs: {
				sort: '={{$parameter.sort.criteria.map(sort => `${sort.direction === "desc" ? "-" : ""}${sort.property}`).join(",")}}',
			},
		},
	},
};
