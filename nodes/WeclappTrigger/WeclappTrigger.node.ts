import {
	type IHookFunctions,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookFunctions,
	type IWebhookResponseData,
	type JsonObject,
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';
import { getWebhookEvent, triggerProperties } from './descriptions';
import { isNotFound, WeclappWebhookApi } from './GenericFunctions';

export class WeclappTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Weclapp Trigger',
		name: 'weclappTrigger',
		icon: { light: 'file:../../icons/weclapp.svg', dark: 'file:../../icons/weclapp.dark.svg' },
		group: ['trigger'],
		version: 1,
		subtitle: 'Ticket Created',
		description: 'Start a workflow when a ticket is created in weclapp',
		defaults: { name: 'Weclapp Trigger' },
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'weclappApi', required: true }],
		webhooks: [
			{ name: 'default', httpMethod: 'POST', responseMode: 'onReceived', path: 'webhook' },
		],
		properties: triggerProperties,
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const data = this.getWorkflowStaticData('node');
				if (!data.webhookId) return false;
				try {
					const event = getWebhookEvent(this);
					const webhook = await WeclappWebhookApi.getWebhook(
						this,
						String(data.webhookId),
					);
					return (
						webhook.url === this.getNodeWebhookUrl('default') &&
						webhook.entityName === event.entityName &&
						webhook.atCreate === event.atCreate &&
						webhook.atUpdate === event.atUpdate &&
						webhook.atDelete === event.atDelete &&
						webhook.requestMethod === 'POST' &&
						!webhook.deactivatedDate
					);
				} catch (error) {
					if (isNotFound(error)) {
						delete data.webhookId;
						return false;
					}
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const data = this.getWorkflowStaticData('node');
				// Replace only the subscription previously created by this node.
				if (data.webhookId) {
					try {
						await WeclappWebhookApi.deleteWebhook(this, String(data.webhookId));
					} catch (error) {
						if (!isNotFound(error))
							throw new NodeApiError(this.getNode(), error as JsonObject);
					}
					delete data.webhookId;
				}
				const webhook = await WeclappWebhookApi.createWebhook(
					this,
					getWebhookEvent(this),
					this.getNodeWebhookUrl('default') as string,
				);
				if (!webhook.id)
					throw new NodeOperationError(
						this.getNode(),
						'weclapp did not return a webhook ID',
					);
				data.webhookId = webhook.id;
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const data = this.getWorkflowStaticData('node');
				if (data.webhookId) {
					try {
						await WeclappWebhookApi.deleteWebhook(this, String(data.webhookId));
					} catch (error) {
						if (!isNotFound(error))
							throw new NodeApiError(this.getNode(), error as JsonObject);
					}
					delete data.webhookId;
				}
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData();
		return { workflowData: [this.helpers.returnJsonArray(body)] };
	}
}
