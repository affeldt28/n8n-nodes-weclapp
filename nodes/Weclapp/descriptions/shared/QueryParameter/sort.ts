import { INodeProperties } from 'n8n-workflow';

export const sortQueryParameter: INodeProperties = {
	name: 'sort',
	displayName: 'Sort',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: '',
	placeholder: 'Add Sort',
	options: [
		{
			name: 'criteria',
			displayName: 'Sort',
			values: [
				{
					name: 'property',
					displayName: 'Property',
					type: 'string',
					default: '',
					placeholder: 'lastModifiedDate',
					required: true,
				},
				{
					name: 'direction',
					displayName: 'Direction',
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
