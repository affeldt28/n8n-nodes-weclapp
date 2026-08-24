import { INodeProperties } from 'n8n-workflow';

export const webhookIdParameter: INodeProperties = {
	displayName: 'Webhook ID',
	name: 'webhookId',
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
	displayName: 'Attributes',
	name: 'attributes',
	type: 'collection',
	default: {},
	placeholder: 'Add Attribute',
	options: [
		{
			displayName: 'At Create',
			name: 'atCreate',
			description: 'Whether the webhook will be triggered when the resource is created',
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
			displayName: 'At Delete',
			name: 'atDelete',
			description: 'Whether the webhook will be triggered when the resource is deleted',
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
			displayName: 'At Update',
			name: 'atUpdate',
			description: 'Whether the webhook will be triggered when the resource is updated',
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
			displayName: 'Deactivated Date',
			name: 'deactivatedDate',
			description: 'The date when the resource was deactivated',
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
			displayName: 'Entity Name',
			name: 'entityName',
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
			displayName: 'Error Message',
			name: 'errorMessage',
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
			displayName: 'Request Method',
			name: 'requestMethod',
			description: 'The HTTP method for the request',
			type: 'options',
			default: 'GET',
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
			displayName: 'URL',
			name: 'url',
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
