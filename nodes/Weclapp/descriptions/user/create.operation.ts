import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';

const properties: INodeProperties[] = [
	dryRunQueryParameter,
	{
		displayName: 'Attributes',
		name: 'attributes',
		type: 'collection',
		default: {},
		placeholder: 'Add Attribute',
		options: [
			{
				displayName: 'Birth Date',
				name: 'birthDate',
				type: 'dateTime',
				default: '',
				typeOptions: {
					dateOnly: true,
				},
				description: 'Birth date of the user',
				routing: {
					send: {
						type: 'body',
						property: 'birthDate',
						value: '={{ Date.parse($value) }}',
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'jane.doe@example.com',
				default: '',
				description: 'Email address of the user',
				routing: {
					send: {
						type: 'body',
						property: 'email',
					},
				},
			},
			{
				displayName: 'Fax Number',
				name: 'faxNumber',
				type: 'string',
				default: '',
				placeholder: '+49 30 12345678',
				typeOptions: {
					maxLength: 100,
				},
				description: 'Fax number of the user',
				routing: {
					send: {
						type: 'body',
						property: 'faxNumber',
					},
				},
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				placeholder: 'Jane',
				typeOptions: {
					maxLength: 50,
				},
				description: 'The first name of the user',
				routing: {
					send: {
						type: 'body',
						property: 'firstName',
					},
				},
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				placeholder: 'Doe',
				typeOptions: {
					maxLength: 50,
				},
				description: 'The last name of the user',
				routing: {
					send: {
						type: 'body',
						property: 'lastName',
					},
				},
			},
			{
				displayName: 'Licenses',
				name: 'licenses',
				type: 'json',
				default: '',
				placeholder: '["CRM", "ERP"]',
				description: 'Licenses assigned to the user as a JSON array',
				routing: {
					send: {
						type: 'body',
						property: 'licenses',
					},
				},
			},
			{
				displayName: 'Mobile Phone Number',
				name: 'mobilePhoneNumber',
				type: 'string',
				default: '',
				placeholder: '+49 151 12345678',
				typeOptions: {
					maxLength: 100,
				},
				description: 'Mobile phone number of the user',
				routing: {
					send: {
						type: 'body',
						property: 'mobilePhoneNumber',
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				placeholder: '+49 30 12345678',
				typeOptions: {
					maxLength: 100,
				},
				description: 'Phone number of the user',
				routing: {
					send: {
						type: 'body',
						property: 'phoneNumber',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: '',
				options: [
					{
						name: 'Active',
						value: 'ACTIVE',
					},
					{
						name: 'Departure',
						value: 'DEPARTURE',
					},
					{
						name: 'Not Active',
						value: 'NOT_ACTIVE',
					},
				],
				description: 'Status of the user',
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				placeholder: 'Dr.',
				typeOptions: {
					maxLength: 1000,
				},
				description: 'Title of the user',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
			{
				displayName: 'User Roles',
				name: 'userRoles',
				type: 'json',
				default: '',
				placeholder: '[{}]',
				description: 'User roles as a JSON array',
				routing: {
					send: {
						type: 'body',
						property: 'userRoles',
					},
				},
			},
		],
	},
	{
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
	},
];

const displayOptions = {
	show: {
		resource: ['user'],
		operation: ['create'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
