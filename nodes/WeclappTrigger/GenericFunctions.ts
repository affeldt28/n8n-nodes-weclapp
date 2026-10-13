import type { IDataObject, IHookFunctions, IHttpRequestMethods } from 'n8n-workflow';
import type { WebhookEvent } from './descriptions/ticket';

async function apiRequest(
	context: IHookFunctions,
	method: IHttpRequestMethods,
	path: string,
	body?: IDataObject,
): Promise<IDataObject> {
	const credentials = await context.getCredentials('weclappApi');
	return await context.helpers.httpRequestWithAuthentication.call(context, 'weclappApi', {
		method,
		url: `https://${credentials.tenant}.weclapp.com/webapp/api/v2${path}`,
		headers: { Accept: 'application/json' },
		body,
		json: true,
	});
}

export function isNotFound(error: unknown): boolean {
	const details = error as {
		httpCode?: string;
		statusCode?: number;
		response?: { status?: number };
	};
	return (
		details?.httpCode === '404' ||
		details?.statusCode === 404 ||
		details?.response?.status === 404
	);
}

export const WeclappWebhookApi = {
	getWebhook(context: IHookFunctions, id: string): Promise<IDataObject> {
		return apiRequest(context, 'GET', `/webhook/id/${encodeURIComponent(id)}`);
	},
	createWebhook(context: IHookFunctions, event: WebhookEvent, url: string): Promise<IDataObject> {
		return apiRequest(context, 'POST', '/webhook', { ...event, requestMethod: 'POST', url });
	},
	deleteWebhook(context: IHookFunctions, id: string): Promise<IDataObject> {
		return apiRequest(context, 'DELETE', `/webhook/id/${encodeURIComponent(id)}`);
	},
};
