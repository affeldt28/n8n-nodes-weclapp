import { type INodeType, type INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';
import { article, party, recurringInvoice, ticket, user, webhook } from './descriptions';

export class Weclapp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Weclapp',
		name: 'weclapp',
		icon: 'file:../../icons/weclapp.svg',
		group: ['input'],
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		version: 1,
		description: 'Interact with weclapp API',
		defaults: {
			name: 'Weclapp',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'weclappApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '=https://{{ $credentials.tenant }}.weclapp.com/webapp/api/v2',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Article',
						value: 'article',
					},
					{
						name: 'Party',
						value: 'party',
					},
					{
						name: 'Recurring Invoice',
						value: 'recurringInvoice',
					},
					{
						name: 'Ticket',
						value: 'ticket',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'user',
			},

			...article.description,
			...party.description,
			...recurringInvoice.description,
			...ticket.description,
			...user.description,
			...webhook.description,
		],
	};
	methods = {};
}
