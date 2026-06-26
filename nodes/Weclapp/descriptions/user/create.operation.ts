import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { customAttributesBodyProperties } from '../shared/BodyProperties';
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
	customAttributesBodyProperties,
];

const displayOptions = {
	show: {
		resource: ['user'],
		operation: ['create'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
