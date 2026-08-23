import { INodeProperties } from 'n8n-workflow';

export const webhookIdParameter: INodeProperties = {
	name: 'webhookId',
	displayName: 'Webhook ID',
	type: 'resourceLocator',
	default: {
		mode: 'id',
		value: '',
	},
	modes: [
		{
			displayName: 'By ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. 12345',
		},
	],
	required: true,
};

export const createUpdateProperties: INodeProperties = {
	name: 'attributes',
	displayName: 'Attributes',
	type: 'collection',
	default: {},
	placeholder: 'Add Attribute',
	options: [
		{
			name: 'atCreate',
			displayName: 'At Create',
			description: 'If true, the webhook will be triggered when the resource is created.',
			type: 'boolean',
			default: false,
			routing: {
				send: {
					type: 'body',
					property: 'atCreate',
				},
			},
		},
		{
			name: 'atDelete',
			displayName: 'At Delete',
			description: 'If true, the webhook will be triggered when the resource is deleted.',
			type: 'boolean',
			default: false,
			routing: {
				send: {
					type: 'body',
					property: 'atDelete',
				},
			},
		},
		{
			name: 'atUpdate',
			displayName: 'At Update',
			description: 'If true, the webhook will be triggered when the resource is updated.',
			type: 'boolean',
			default: false,
			routing: {
				send: {
					type: 'body',
					property: 'atUpdate',
				},
			},
		},
		{
			name: 'deactivatedDate',
			displayName: 'Deactivated Date',
			description: 'The date when the resource was deactivated.',
			type: 'dateTime',
			default: '',
			routing: {
				send: {
					type: 'body',
					property: 'deactivatedDate',
					value: '={{ Date.parse($value) }}',
				},
			},
		},
		{
			name: 'entityName',
			displayName: 'Entity Name',
			description: 'Name of the entity',
			type: 'string',
			typeOptions: {
				maxLength: 255,
			},
			default: '',
			placeholder: 'Enter entity name',
			routing: {
				send: {
					type: 'body',
					property: 'entityName',
				},
			},
		},
		{
			name: 'errorMessage',
			displayName: 'Error Message',
			description: 'Message describing the error',
			type: 'string',
			typeOptions: {
				maxLength: 255,
			},
			default: '',
			placeholder: 'Enter error message',
			routing: {
				send: {
					type: 'body',
					property: 'errorMessage',
				},
			},
		},
		{
			name: 'requestMethod',
			displayName: 'Request Method',
			description: 'The HTTP method for the request',
			type: 'options',
			default: '',
			options: [
				{
					name: 'GET',
					value: 'GET',
				},
				{
					name: 'POST',
					value: 'POST',
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'requestMethod',
				},
			},
		},
		{
			name: 'url',
			displayName: 'URL',
			description: 'The URL to which the webhook will be sent',
			type: 'string',
			typeOptions: {
				maxLength: 1000,
			},
			default: '',
			placeholder: 'Enter URL',
			routing: {
				send: {
					type: 'body',
					property: 'url',
				},
			},
		},
	],
};
