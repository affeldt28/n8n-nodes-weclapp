import { INodeProperties } from 'n8n-workflow';

export const sortQueryParameter: INodeProperties = {
	displayName: 'Sorting',
	name: 'sort',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Sort',
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
					placeholder: 'e.g. lastModifiedDate',
					required: true,
				},
				{
					displayName: 'Direction',
					name: 'direction',
					type: 'options',
					default: 'asc',
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
