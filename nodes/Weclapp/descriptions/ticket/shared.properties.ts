import type { INodeProperties } from 'n8n-workflow';
import { customAttributesBodyProperties } from '../shared/BodyProperties';

export const ticketIdParameter: INodeProperties = {
	displayName: 'Ticket ID',
	name: 'ticketId',
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
		customAttributesBodyProperties,
		{
			displayName: 'Assigned Pooling Group ID',
			name: 'assignedPoolingGroupId',
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
			displayName: 'Assigned User ID',
			name: 'assignedUserId',
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
			displayName: 'Billable',
			name: 'billable',
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
			displayName: 'CC Email Addresses',
			name: 'ccEmailAddresses',
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
			displayName: 'Contact ID',
			name: 'contactId',
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
			displayName: 'Contract ID',
			name: 'contractId',
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
			displayName: 'Description',
			name: 'description',
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
			displayName: 'Disable Email Templates',
			name: 'disableEmailTemplates',
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
			displayName: 'Email',
			name: 'email',
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
			displayName: 'Entity References',
			name: 'entityReferences',
			description: 'Entities associated with the ticket',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			default: {},
			placeholder: 'Add Entity Reference',
			options: [
				{
					displayName: 'Entity Reference',
					name: 'entityReference',
					values: [
						{
							displayName: 'Entity ID',
							name: 'entityId',
							description: 'ID of the referenced entity',
							type: 'string',
							default: '',
							placeholder: 'e.g. 12345',
						},
						{
							displayName: 'Entity Name',
							name: 'entityName',
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
			displayName: 'First Name',
			name: 'firstName',
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
			displayName: 'Follow-Up Date',
			name: 'followUpDate',
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
			displayName: 'Invoicing Status',
			name: 'invoicingStatus',
			description: 'Invoicing status of the ticket',
			type: 'options',
			default: 'INVOICED',
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
			displayName: 'Is Template',
			name: 'isTemplate',
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
			displayName: 'Language',
			name: 'language',
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
			displayName: 'Last Name',
			name: 'lastName',
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
			displayName: 'Legacy Article ID',
			name: 'legacyArticleId',
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
			displayName: 'Legacy Time and Material Ticket',
			name: 'legacyTimeAndMaterialTicket',
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
			displayName: 'Mail2Ticket ID',
			name: 'mail2TicketId',
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
			displayName: 'Mobile Phone Number',
			name: 'mobilePhoneNumber',
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
			displayName: 'Note',
			name: 'note',
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
			displayName: 'Party ID',
			name: 'partyId',
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
			displayName: 'Performance Recorded Status',
			name: 'performanceRecordedStatus',
			description: 'Performance recording status of the ticket',
			type: 'options',
			default: 'NOT_PERFORMANCE_RECORDABLE',
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
			displayName: 'Phone Number',
			name: 'phoneNumber',
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
			displayName: 'Responsible User ID',
			name: 'responsibleUserId',
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
			displayName: 'Room',
			name: 'room',
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
			displayName: 'Solution Due Date',
			name: 'solutionDueDate',
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
			displayName: 'Subject',
			name: 'subject',
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
			displayName: 'Tags',
			name: 'tags',
			description: 'Tags assigned to the ticket',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			default: {},
			placeholder: 'Add Tag',
			options: [
				{
					displayName: 'Tag',
					name: 'items',
					values: [
						{
							displayName: 'Tag',
							name: 'tag',
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
			displayName: 'Ticket Category ID',
			name: 'ticketCategoryId',
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
			displayName: 'Ticket Channel ID',
			name: 'ticketChannelId',
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
			displayName: 'Ticket Number',
			name: 'ticketNumber',
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
			displayName: 'Ticket Priority ID',
			name: 'ticketPriorityId',
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
			displayName: 'Ticket Rating',
			name: 'ticketRating',
			description: 'Rating assigned to the ticket',
			type: 'options',
			default: 'STARS_1',
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
			displayName: 'Ticket Service Level Agreement ID',
			name: 'ticketServiceLevelAgreementId',
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
			displayName: 'Ticket Status ID',
			name: 'ticketStatusId',
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
			displayName: 'Ticket Type ID',
			name: 'ticketTypeId',
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
			displayName: 'Watchers',
			name: 'watchers',
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
