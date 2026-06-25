import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { dryRunQueryParameter } from '../shared/QueryParameter';

const properties: INodeProperties[] = [
	dryRunQueryParameter,
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
						displayName: 'Boolean Value',
						name: 'booleanValue',
						type: 'boolean',
						default: '',
						description: 'Boolean value of the custom attribute',
					},
					{
						displayName: 'Date Value',
						name: 'dateValue',
						type: 'number',
						default: '',
						placeholder: '1735689600000',
						description: 'Date value as an integer timestamp',
					},
					{
						displayName: 'Entity ID',
						name: 'entityId',
						type: 'string',
						default: '',
						placeholder: '12345',
						description: 'ID of the referenced entity',
					},
					{
						displayName: 'Entity References',
						name: 'entityReferences',
						type: 'json',
						default: '',
						placeholder: '[{"entityId":"12345","entityName":"Example"}]',
						description:
							'Entity references as a JSON array of objects containing entityId and entityName',
					},
					{
						displayName: 'Number Value',
						name: 'numberValue',
						type: 'number',
						default: '',
						placeholder: '42.5',
						description: 'Decimal value of the custom attribute',
					},
					{
						displayName: 'Selected Value ID',
						name: 'selectedValueId',
						type: 'string',
						default: '',
						placeholder: '12345',
						description: 'ID of the selected custom attribute value',
					},
					{
						displayName: 'Selected Values',
						name: 'selectedValues',
						type: 'json',
						default: '',
						placeholder: '[{}]',
						description: 'Selected values as a JSON array',
					},
					{
						displayName: 'String Value',
						name: 'stringValue',
						type: 'string',
						default: '',
						placeholder: 'Example value',
						description: 'String value of the custom attribute',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'customAttributes',
				value: '={{ $value.customAttribute }}',
			},
		},
	},
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
		type: 'string',
		default: '',
		placeholder: 'Add License',
		typeOptions: {
			multipleValues: true,
		},
		description: 'Licenses assigned to the user',
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
];

const displayOptions = {
	show: {
		resource: ['user'],
		operation: ['create'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
