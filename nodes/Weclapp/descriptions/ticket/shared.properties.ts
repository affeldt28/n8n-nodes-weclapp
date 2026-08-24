import type { INodeProperties } from 'n8n-workflow';
import { customAttributesBodyProperties } from '../shared/BodyProperties';

export const ticketIdParameter: INodeProperties = {
	name: 'ticketId',
	displayName: 'Ticket ID',
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
		customAttributesBodyProperties,
		{
			name: 'assignedPoolingGroupId',
			displayName: 'Assigned Pooling Group ID',
			description: 'ID of the pooling group assigned to the ticket',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'assignedPoolingGroupId',
				},
			},
		},
		{
			name: 'assignedUserId',
			displayName: 'Assigned User ID',
			description: 'ID of the user assigned to the ticket',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'assignedUserId',
				},
			},
		},
		{
			name: 'billable',
			displayName: 'Billable',
			description: 'Whether the ticket is billable',
			type: 'boolean',
			default: false,
			routing: {
				send: {
					type: 'body',
					property: 'billable',
				},
			},
		},
		{
			name: 'ccEmailAddresses',
			displayName: 'CC Email Addresses',
			description: 'Email addresses to receive a copy of ticket emails',
			type: 'string',
			typeOptions: {
				maxLength: 4000,
			},
			default: '',
			placeholder: 'e.g. jane.doe@example.com',
			routing: {
				send: {
					type: 'body',
					property: 'ccEmailAddresses',
				},
			},
		},
		{
			name: 'contactId',
			displayName: 'Contact ID',
			description: 'ID of the contact associated with the ticket',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'contactId',
				},
			},
		},
		{
			name: 'contractId',
			displayName: 'Contract ID',
			description: 'ID of the contract associated with the ticket',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'contractId',
				},
			},
		},
		{
			name: 'description',
			displayName: 'Description',
			description: 'Description of the ticket in HTML format',
			type: 'string',
			typeOptions: {
				rows: 4,
			},
			default: '',
			placeholder: 'e.g. <p>Describe the issue</p>',
			routing: {
				send: {
					type: 'body',
					property: 'description',
				},
			},
		},
		{
			name: 'disableEmailTemplates',
			displayName: 'Disable Email Templates',
			description: 'Whether email templates are disabled for the ticket',
			type: 'boolean',
			default: false,
			routing: {
				send: {
					type: 'body',
					property: 'disableEmailTemplates',
				},
			},
		},
		{
			name: 'email',
			displayName: 'Email',
			description: 'Email address associated with the ticket',
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
			name: 'entityReferences',
			displayName: 'Entity References',
			description: 'Entities associated with the ticket',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			default: {},
			placeholder: 'Add Entity Reference',
			options: [
				{
					name: 'entityReference',
					displayName: 'Entity Reference',
					values: [
						{
							name: 'entityId',
							displayName: 'Entity ID',
							description: 'ID of the referenced entity',
							type: 'string',
							default: '',
							placeholder: 'e.g. 12345',
						},
						{
							name: 'entityName',
							displayName: 'Entity Name',
							description: 'Name of the referenced entity',
							type: 'string',
							default: '',
							placeholder: 'e.g. salesOrder',
						},
					],
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'entityReferences',
					value: '={{ $value.entityReference ?? [] }}',
				},
			},
		},
		{
			name: 'firstName',
			displayName: 'First Name',
			description: 'First name of the ticket contact',
			type: 'string',
			typeOptions: {
				maxLength: 1000,
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
			name: 'followUpDate',
			displayName: 'Follow-Up Date',
			description: 'Date on which the ticket should be followed up',
			type: 'dateTime',
			default: '',
			routing: {
				send: {
					type: 'body',
					property: 'followUpDate',
					value: '={{ Date.parse($value) }}',
				},
			},
		},
		{
			name: 'invoicingStatus',
			displayName: 'Invoicing Status',
			description: 'Invoicing status of the ticket',
			type: 'options',
			default: '',
			options: [
				{
					name: 'Invoiced',
					value: 'INVOICED',
				},
				{
					name: 'Not Invoiced',
					value: 'NOT_INVOICED',
				},
				{
					name: 'Partly Invoiced',
					value: 'PARTLY_INVOICED',
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'invoicingStatus',
				},
			},
		},
		{
			name: 'isTemplate',
			displayName: 'Is Template',
			description: 'Whether the ticket is a template',
			type: 'boolean',
			default: false,
			routing: {
				send: {
					type: 'body',
					property: 'isTemplate',
				},
			},
		},
		{
			name: 'language',
			displayName: 'Language',
			description: 'Language of the ticket',
			type: 'string',
			typeOptions: {
				maxLength: 1000,
			},
			default: '',
			placeholder: 'e.g. de',
			routing: {
				send: {
					type: 'body',
					property: 'language',
				},
			},
		},
		{
			name: 'lastName',
			displayName: 'Last Name',
			description: 'Last name of the ticket contact',
			type: 'string',
			typeOptions: {
				maxLength: 1000,
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
			name: 'legacyArticleId',
			displayName: 'Legacy Article ID',
			description: 'ID of the legacy article associated with the ticket',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'legacyArticleId',
				},
			},
		},
		{
			name: 'legacyTimeAndMaterialTicket',
			displayName: 'Legacy Time and Material Ticket',
			description: 'Whether the ticket is a legacy time and material ticket',
			type: 'boolean',
			default: false,
			routing: {
				send: {
					type: 'body',
					property: 'legacyTimeAndMaterialTicket',
				},
			},
		},
		{
			name: 'mail2TicketId',
			displayName: 'Mail2Ticket ID',
			description: 'ID of the mail-to-ticket record associated with the ticket',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'mail2TicketId',
				},
			},
		},
		{
			name: 'mobilePhoneNumber',
			displayName: 'Mobile Phone Number',
			description: 'Mobile phone number of the ticket contact',
			type: 'string',
			typeOptions: {
				maxLength: 1000,
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
			name: 'note',
			displayName: 'Note',
			description: 'Internal note for the ticket',
			type: 'string',
			typeOptions: {
				maxLength: 1000,
				rows: 4,
			},
			default: '',
			placeholder: 'Enter a note',
			routing: {
				send: {
					type: 'body',
					property: 'note',
				},
			},
		},
		{
			name: 'partyId',
			displayName: 'Party ID',
			description: 'ID of the party associated with the ticket',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'partyId',
				},
			},
		},
		{
			name: 'performanceRecordedStatus',
			displayName: 'Performance Recorded Status',
			description: 'Performance recording status of the ticket',
			type: 'options',
			default: '',
			options: [
				{
					name: 'Not Performance Recordable',
					value: 'NOT_PERFORMANCE_RECORDABLE',
				},
				{
					name: 'On Performance Record',
					value: 'ON_PERFORMANCE_RECORD',
				},
				{
					name: 'Performance Recordable',
					value: 'PERFORMANCE_RECORDABLE',
				},
				{
					name: 'Performance Recorded',
					value: 'PERFORMANCE_RECORDED',
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'performanceRecordedStatus',
				},
			},
		},
		{
			name: 'phoneNumber',
			displayName: 'Phone Number',
			description: 'Phone number of the ticket contact',
			type: 'string',
			typeOptions: {
				maxLength: 1000,
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
			name: 'responsibleUserId',
			displayName: 'Responsible User ID',
			description: 'ID of the user responsible for the ticket',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'responsibleUserId',
				},
			},
		},
		{
			name: 'room',
			displayName: 'Room',
			description: 'Room associated with the ticket',
			type: 'string',
			typeOptions: {
				maxLength: 50,
			},
			default: '',
			placeholder: 'e.g. 3.12',
			routing: {
				send: {
					type: 'body',
					property: 'room',
				},
			},
		},
		{
			name: 'solutionDueDate',
			displayName: 'Solution Due Date',
			description: 'Date by which the ticket should be resolved',
			type: 'dateTime',
			default: '',
			routing: {
				send: {
					type: 'body',
					property: 'solutionDueDate',
					value: '={{ Date.parse($value) }}',
				},
			},
		},
		{
			name: 'subject',
			displayName: 'Subject',
			description: 'Subject of the ticket',
			type: 'string',
			typeOptions: {
				maxLength: 150,
			},
			default: '',
			placeholder: 'e.g. Unable to access account',
			routing: {
				send: {
					type: 'body',
					property: 'subject',
				},
			},
		},
		{
			name: 'tags',
			displayName: 'Tags',
			description: 'Tags assigned to the ticket',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			default: {},
			placeholder: 'Add Tag',
			options: [
				{
					name: 'items',
					displayName: 'Tag',
					values: [
						{
							name: 'tag',
							displayName: 'Tag',
							description: 'Tag to add to the ticket',
							type: 'string',
							default: '',
						},
					],
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'tags',
					value: '={{ ($value.items ?? []).map((item) => item.tag) }}',
				},
			},
		},
		{
			name: 'ticketCategoryId',
			displayName: 'Ticket Category ID',
			description: 'ID of the ticket category',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'ticketCategoryId',
				},
			},
		},
		{
			name: 'ticketChannelId',
			displayName: 'Ticket Channel ID',
			description: 'ID of the ticket channel',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'ticketChannelId',
				},
			},
		},
		{
			name: 'ticketNumber',
			displayName: 'Ticket Number',
			description: 'Ticket number',
			type: 'string',
			typeOptions: {
				maxLength: 64,
			},
			default: '',
			placeholder: 'e.g. TICKET-12345',
			routing: {
				send: {
					type: 'body',
					property: 'ticketNumber',
				},
			},
		},
		{
			name: 'ticketPriorityId',
			displayName: 'Ticket Priority ID',
			description: 'ID of the ticket priority',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'ticketPriorityId',
				},
			},
		},
		{
			name: 'ticketRating',
			displayName: 'Ticket Rating',
			description: 'Rating assigned to the ticket',
			type: 'options',
			default: '',
			options: [
				{
					name: '1 Star',
					value: 'STARS_1',
				},
				{
					name: '2 Stars',
					value: 'STARS_2',
				},
				{
					name: '3 Stars',
					value: 'STARS_3',
				},
				{
					name: '4 Stars',
					value: 'STARS_4',
				},
				{
					name: '5 Stars',
					value: 'STARS_5',
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'ticketRating',
				},
			},
		},
		{
			name: 'ticketServiceLevelAgreementId',
			displayName: 'Ticket Service Level Agreement ID',
			description: 'ID of the service level agreement for the ticket',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'ticketServiceLevelAgreementId',
				},
			},
		},
		{
			name: 'ticketStatusId',
			displayName: 'Ticket Status ID',
			description: 'ID of the ticket status',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'ticketStatusId',
				},
			},
		},
		{
			name: 'ticketTypeId',
			displayName: 'Ticket Type ID',
			description: 'ID of the ticket type',
			type: 'string',
			default: '',
			placeholder: 'e.g. 12345',
			routing: {
				send: {
					type: 'body',
					property: 'ticketTypeId',
				},
			},
		},
		{
			name: 'watchers',
			displayName: 'Watchers',
			description: 'Watchers assigned to the ticket as a JSON array',
			type: 'json',
			default: '[]',
			placeholder: 'e.g. [{}]',
			routing: {
				send: {
					type: 'body',
					property: 'watchers',
				},
			},
		},
	],
};
