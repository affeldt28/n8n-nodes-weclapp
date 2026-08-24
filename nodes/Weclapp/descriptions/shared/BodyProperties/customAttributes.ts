import { INodeProperties } from 'n8n-workflow';

export const customAttributesBodyProperties: INodeProperties = {
	displayName: 'Custom Attributes',
	name: 'customAttributes',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Custom Attribute',
	options: [
		{
			displayName: 'Custom Attribute',
			name: 'customAttribute',
			values: [
				{
					displayName: 'Attribute Definition ID',
					name: 'attributeDefinitionId',
					description: 'ID of the custom attribute definition',
					type: 'string',
					default: '',
					placeholder: 'e.g. 12345',
				},
				{
					displayName: 'Boolean Value',
					name: 'booleanValue',
					description: 'Whether the custom attribute is true or false',
					type: 'boolean',
					default: false,
				},
				{
					displayName: 'Data Type',
					name: 'dataType',
					description: 'Type of custom attribute value to send',
					type: 'options',
					default: 'stringValue',
					options: [
						{
							name: 'Boolean',
							value: 'booleanValue',
						},
						{
							name: 'Date',
							value: 'dateValue',
						},
						{
							name: 'Entity ID',
							value: 'entityId',
						},
						{
							name: 'Entity References',
							value: 'entityReferences',
						},
						{
							name: 'Number',
							value: 'numberValue',
						},
						{
							name: 'Selected Value ID',
							value: 'selectedValueId',
						},
						{
							name: 'Selected Values',
							value: 'selectedValues',
						},
						{
							name: 'String',
							value: 'stringValue',
						},
					]
				},
				{
					displayName: 'Date Value',
					name: 'dateValue',
					description: 'Date value as an integer timestamp',
					type: 'number',
					default: '',
					placeholder: 'e.g. 1735689600000',
				},
				{
					displayName: 'Entity ID',
					name: 'entityId',
					description: 'ID of the referenced entity',
					type: 'string',
					default: '',
					placeholder: 'e.g. 12345',
				},
				{
					displayName: 'Entity References',
					name: 'entityReferences',
					description: 'Entity references as a JSON array of objects containing entityId and entityName',
					type: 'json',
					default: '',
					placeholder: 'e.g.	[{\'entityId\':\'12345\',\'entityName\':\'Example\'}]',
				},
				{
					displayName: 'Number Value',
					name: 'numberValue',
					description: 'Decimal value of the custom attribute',
					type: 'number',
					default: '',
					placeholder: 'e.g. 42.5',
				},
				{
					displayName: 'Selected Value ID',
					name: 'selectedValueId',
					description: 'ID of the selected custom attribute value',
					type: 'string',
					default: '',
					placeholder: 'e.g. 12345',
				},
				{
					displayName: 'Selected Values',
					name: 'selectedValues',
					description: 'Selected values as a JSON array',
					type: 'json',
					default: '',
					placeholder: 'e.g.	[{}]',
				},
				{
					displayName: 'String Value',
					name: 'stringValue',
					description: 'String value of the custom attribute',
					type: 'string',
					default: '',
					placeholder: 'e.g. Example value',
				},
			],
		},
	],
	routing: {
		send: {
			type: 'body',
			property: 'customAttributes',
			value: "={{ ($value.customAttribute ?? []).map(({ dataType, attributeDefinitionId, ...values }) => { const value = values[dataType]; return Object.fromEntries(Object.entries({ attributeDefinitionId, ...(dataType ? { [dataType]: value } : {}) }).filter(([, value]) => value !== undefined && value !== null && value !== '' && (!Array.isArray(value) || value.length > 0))); }).filter((item) => item.attributeDefinitionId !== undefined || Object.keys(item).some((property) => property !== 'attributeDefinitionId')) }}",
		},
	},
};
