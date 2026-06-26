import { type INodeProperties, updateDisplayOptions } from 'n8n-workflow';
import { customAttributesBodyProperties } from '../shared/BodyProperties';
import { dryRunQueryParameter } from '../shared/QueryParameter';

const properties: INodeProperties[] = [
	dryRunQueryParameter,
	{
		name: 'attributes',
		displayName: 'Attributes',
		type: 'collection',
		default: {},
		placeholder: 'Add Attribute',
		options: [
			{
				name: 'birthDate',
				displayName: 'Birth Date',
				description: 'Birth date of the user',
				type: 'dateTime',
				typeOptions: {
					dateOnly: true,
				},
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'birthDate',
						value: '={{ Date.parse($value) }}',
					},
				},
			},
			{
				name: 'email',
				displayName: 'Email',
				description: 'Email address of the user',
				type: 'string',
				default: '',
				placeholder: 'jane.doe@example.com',
				routing: {
					send: {
						type: 'body',
						property: 'email',
					},
				},
			},
			{
				name: 'faxNumber',
				displayName: 'Fax Number',
				description: 'Fax number of the user',
				type: 'string',
				typeOptions: {
					maxLength: 100,
				},
				default: '',
				placeholder: '+49 30 12345678',
				routing: {
					send: {
						type: 'body',
						property: 'faxNumber',
					},
				},
			},
			{
				name: 'firstName',
				displayName: 'First Name',
				description: 'The first name of the user',
				type: 'string',
				typeOptions: {
					maxLength: 50,
				},
				default: '',
				placeholder: 'Jane',
				routing: {
					send: {
						type: 'body',
						property: 'firstName',
					},
				},
			},
			{
				name: 'lastName',
				displayName: 'Last Name',
				description: 'The last name of the user',
				type: 'string',
				typeOptions: {
					maxLength: 50,
				},
				default: '',
				placeholder: 'Doe',
				routing: {
					send: {
						type: 'body',
						property: 'lastName',
					},
				},
			},
			{
				name: 'licenses',
				displayName: 'Licenses',
				description: 'Licenses assigned to the user as a JSON array',
				type: 'json',
				default: '',
				placeholder: '["CRM", "ERP"]',
				routing: {
					send: {
						type: 'body',
						property: 'licenses',
					},
				},
			},
			{
				name: 'mobilePhoneNumber',
				displayName: 'Mobile Phone Number',
				description: 'Mobile phone number of the user',
				type: 'string',
				typeOptions: {
					maxLength: 100,
				},
				default: '',
				placeholder: '+49 151 12345678',
				routing: {
					send: {
						type: 'body',
						property: 'mobilePhoneNumber',
					},
				},
			},
			{
				name: 'phoneNumber',
				displayName: 'Phone Number',
				description: 'Phone number of the user',
				type: 'string',
				typeOptions: {
					maxLength: 100,
				},
				default: '',
				placeholder: '+49 30 12345678',
				routing: {
					send: {
						type: 'body',
						property: 'phoneNumber',
					},
				},
			},
			{
				name: 'status',
				displayName: 'Status',
				description: 'Status of the user',
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
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
			{
				name: 'title',
				displayName: 'Title',
				description: 'Title of the user',
				type: 'string',
				typeOptions: {
					maxLength: 1000,
				},
				default: '',
				placeholder: 'Dr.',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
			{
				name: 'userRoles',
				displayName: 'User Roles',
				description: 'User roles as a JSON array',
				type: 'json',
				default: '',
				placeholder: '[{}]',
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
