import type { INodeProperties } from 'n8n-workflow';

export interface WebhookEvent {
	entityName: string;
	atCreate: boolean;
	atUpdate: boolean;
	atDelete: boolean;
}

export const ticketEvents: Record<string, WebhookEvent> = {
	ticketCreated: { entityName: 'ticket', atCreate: true, atUpdate: false, atDelete: false },
};

export const ticketProperties: INodeProperties[] = [
	{
		displayName: 'Trigger On',
		name: 'event',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['ticket'] } },
		options: [{ name: 'Ticket Created', value: 'ticketCreated' }],
		default: 'ticketCreated',
	},
];
