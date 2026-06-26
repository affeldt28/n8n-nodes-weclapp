import { INodeProperties } from 'n8n-workflow';

export const customAttributesBodyProperties: INodeProperties = {
	displayName: 'Custom Attributes',
	name: 'customAttributes',
	type: 'fixedCollection',
	default: {},
	placeholder: 'Add Custom Attribute',
	typeOptions: {
		multipleValues: true,
	},
	options: [
		{
			displayName: 'Custom Attribute',
			name: 'customAttribute',
			values: [
				{
					displayName: 'Attribute Definition ID',
					name: 'attributeDefinitionId',
					type: 'string',
					default: '',
					placeholder: '12345',
					description: 'ID of the custom attribute definition',
				},
				{
					displayName: 'Data Type',
					name: 'dataType',
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
					],
					description: 'Type of custom attribute value to send',
				},
				{
					displayName: 'Boolean Value',
					name: 'booleanValue',
					type: 'boolean',
					default: false,
					description: 'Boolean value of the custom attribute',
					displayOptions: {
						show: {
							dataType: ['booleanValue'],
						},
					},
				},
				{
					displayName: 'Date Value',
					name: 'dateValue',
					type: 'number',
					default: '',
					placeholder: '1735689600000',
					description: 'Date value as an integer timestamp',
					displayOptions: {
						show: {
							dataType: ['dateValue'],
						},
					},
				},
				{
					displayName: 'Entity ID',
					name: 'entityId',
					type: 'string',
					default: '',
					placeholder: '12345',
					description: 'ID of the referenced entity',
					displayOptions: {
						show: {
							dataType: ['entityId'],
						},
					},
				},
				{
					displayName: 'Entity References',
					name: 'entityReferences',
					type: 'json',
					default: '',
					placeholder: '[{"entityId":"12345","entityName":"Example"}]',
					description:
						'Entity references as a JSON array of objects containing entityId and entityName',
					displayOptions: {
						show: {
							dataType: ['entityReferences'],
						},
					},
				},
				{
					displayName: 'Number Value',
					name: 'numberValue',
					type: 'number',
					default: '',
					placeholder: '42.5',
					description: 'Decimal value of the custom attribute',
					displayOptions: {
						show: {
							dataType: ['numberValue'],
						},
					},
				},
				{
					displayName: 'Selected Value ID',
					name: 'selectedValueId',
					type: 'string',
					default: '',
					placeholder: '12345',
					description: 'ID of the selected custom attribute value',
					displayOptions: {
						show: {
							dataType: ['selectedValueId'],
						},
					},
				},
				{
					displayName: 'Selected Values',
					name: 'selectedValues',
					type: 'json',
					default: '',
					placeholder: '[{}]',
					description: 'Selected values as a JSON array',
					displayOptions: {
						show: {
							dataType: ['selectedValues'],
						},
					},
				},
				{
					displayName: 'String Value',
					name: 'stringValue',
					type: 'string',
					default: '',
					placeholder: 'Example value',
					description: 'String value of the custom attribute',
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
