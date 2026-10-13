import { type IHookFunctions, type INodeProperties, NodeOperationError } from 'n8n-workflow';
import { ticketEvents, ticketProperties, type WebhookEvent } from './ticket';

const resourceEvents: Record<string, Record<string, WebhookEvent>> = { ticket: ticketEvents };

export const triggerProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [{ name: 'Ticket', value: 'ticket' }],
		default: 'ticket',
	},
	...ticketProperties,
];

export function getWebhookEvent(context: IHookFunctions): WebhookEvent {
	const resource = context.getNodeParameter('resource', 'ticket') as string;
	const event = context.getNodeParameter('event', 'ticketCreated') as string;
	const configuration = resourceEvents[resource]?.[event];
	if (!configuration) {
		throw new NodeOperationError(
			context.getNode(),
			`Unsupported weclapp event: ${resource}/${event}`,
		);
	}
	return configuration;
}
