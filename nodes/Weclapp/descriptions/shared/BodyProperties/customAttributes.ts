import { INodeProperties } from 'n8n-workflow';

export const customAttributesBodyProperties: INodeProperties = {
	name: 'customAttributes',
	displayName: 'Custom Attributes',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Custom Attribute',
	options: [
		{
			name: 'customAttribute',
			displayName: 'Custom Attribute',
			values: [
				{
					name: 'attributeDefinitionId',
					displayName: 'Attribute Definition Id',
					description: 'Id of the custom attribute definition',
					type: 'string',
					default: '',
					placeholder: 'e.g. 12345',
				},
				{
					name: 'dataType',
					displayName: 'Data Type',
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
							name: 'Entity Id',
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
							name: 'Selected Value Id',
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
					],
				},
				{
					name: 'booleanValue',
					displayName: 'Boolean Value',
					description: 'Boolean value of the custom attribute',
					type: 'boolean',
					default: false,
					displayOptions: {
						show: {
							dataType: ['booleanValue'],
						},
					},
				},
				{
					name: 'dateValue',
					displayName: 'Date Value',
					description: 'Date value as an integer timestamp',
					type: 'number',
					default: '',
					placeholder: 'e.g. 1735689600000',
					displayOptions: {
						show: {
							dataType: ['dateValue'],
						},
					},
				},
				{
					name: 'entityId',
					displayName: 'Entity Id',
					description: 'Id of the referenced entity',
					type: 'string',
					default: '',
					placeholder: 'e.g. 12345',
					displayOptions: {
						show: {
							dataType: ['entityId'],
						},
					},
				},
				{
					name: 'entityReferences',
					displayName: 'Entity References',
					description:
						'Entity references as a JSON array of objects containing entityId and entityName',
					type: 'json',
					default: '',
					placeholder: 'e.g. [{"entityId":"12345","entityName":"Example"}]',
					displayOptions: {
						show: {
							dataType: ['entityReferences'],
						},
					},
				},
				{
					name: 'numberValue',
					displayName: 'Number Value',
					description: 'Decimal value of the custom attribute',
					type: 'number',
					default: '',
					placeholder: 'e.g. 42.5',
					displayOptions: {
						show: {
							dataType: ['numberValue'],
						},
					},
				},
				{
					name: 'selectedValueId',
					displayName: 'Selected Value Id',
					description: 'Id of the selected custom attribute value',
					type: 'string',
					default: '',
					placeholder: 'e.g. 12345',
					displayOptions: {
						show: {
							dataType: ['selectedValueId'],
						},
					},
				},
				{
					name: 'selectedValues',
					displayName: 'Selected Values',
					description: 'Selected values as a JSON array',
					type: 'json',
					default: '',
					placeholder: 'e.g. [{}]',
					displayOptions: {
						show: {
							dataType: ['selectedValues'],
						},
					},
				},
				{
					name: 'stringValue',
					displayName: 'String Value',
					description: 'String value of the custom attribute',
					type: 'string',
					default: '',
					placeholder: 'e.g. Example value',
					displayOptions: {
						show: {
							dataType: ['stringValue'],
						},
					},
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
