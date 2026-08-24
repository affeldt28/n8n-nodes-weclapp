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
				displayName: 'Username',
				name: 'username',
				description: 'Username of the user',
				type: 'string',
				default: '',
				placeholder: 'e.g. jane.doe',
				routing: {
					send: {
						type: 'body',
						property: 'username',
					},
				},
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				description: 'The first name of the user',
				type: 'string',
				typeOptions: {
					maxLength: 50,
				},
				default: '',
				placeholder: 'e.g. Jane',
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
				description: 'The last name of the user',
				type: 'string',
				typeOptions: {
					maxLength: 50,
				},
				default: '',
				placeholder: 'e.g. Doe',
				routing: {
					send: {
						type: 'body',
						property: 'lastName',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				description: 'Title of the user',
				type: 'string',
				typeOptions: {
					maxLength: 1000,
				},
				default: '',
				placeholder: 'e.g. Dr.',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
			{
				displayName: 'Birth Date',
				name: 'birthDate',
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
				displayName: 'Image ID',
				name: 'imageId',
				description: 'ID of the image of the user',
				type: 'string',
				default: '',
				placeholder: 'e.g. 12345',
				routing: {
					send: {
						type: 'body',
						property: 'imageId',
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				description: 'Email address of the user',
				type: 'string',
				default: '',
				placeholder: 'e.g. jane.doe@example.com',
				routing: {
					send: {
						type: 'body',
						property: 'email',
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				description: 'Phone number of the user',
				type: 'string',
				typeOptions: {
					maxLength: 100,
				},
				default: '',
				placeholder: 'e.g. +49 30 12345678',
				routing: {
					send: {
						type: 'body',
						property: 'phoneNumber',
					},
				},
			},
			{
				displayName: 'Mobile Phone Number',
				name: 'mobilePhoneNumber',
				description: 'Mobile phone number of the user',
				type: 'string',
				typeOptions: {
					maxLength: 100,
				},
				default: '',
				placeholder: 'e.g. +49 151 12345678',
				routing: {
					send: {
						type: 'body',
						property: 'mobilePhoneNumber',
					},
				},
			},
			{
				displayName: 'Fax Number',
				name: 'faxNumber',
				description: 'Fax number of the user',
				type: 'string',
				typeOptions: {
					maxLength: 100,
				},
				default: '',
				placeholder: 'e.g. +49 30 12345678',
				routing: {
					send: {
						type: 'body',
						property: 'faxNumber',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				description: 'Status of the user',
				type: 'options',
				default: 'ACTIVE',
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
				displayName: 'Licenses',
				name: 'licenses',
				description: 'Licenses assigned to the user as a JSON array',
				type: 'json',
				default: '[]',
				placeholder: 'e.g. ["CRM", "ERP"]',
				routing: {
					send: {
						type: 'body',
						property: 'licenses',
					},
				},
			},
			{
				displayName: 'User Roles',
				name: 'userRoles',
				description: 'User roles as a JSON array',
				type: 'json',
				default: '[]',
				placeholder: 'e.g. [{"ID":"12345"}]',
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
