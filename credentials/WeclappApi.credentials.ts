import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class WeclappApi implements ICredentialType {
	name = 'weclappApi';

	displayName = 'Weclapp API';

	icon: Icon = { light: 'file:../icons/weclapp.svg', dark: 'file:../icons/weclapp.svg' };

	documentationUrl = 'https://www.weclapp.com/api/#overview--security-and-authentication';

	properties: INodeProperties[] = [
		{
			displayName: 'Tenant',
			name: 'tenant',
			type: 'string',
			typeOptions: { password: false },
			required: true,
			default: '',
			description:
				'The base URL of your weclapp instance is https://&lt;TENANT&gt;.weclapp.com. Enter the &lt;TENANT&gt; part here.',
			hint: 'The base URL of your weclapp instance is <code>https://&lt;TENANT&gt;.weclapp.com</code>. Enter the <code>&lt;TENANT&gt;</code> part here.',
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description:
				'The token is configurable in your weclapp account under My settings &gt; API.',
			hint: 'The token is configurable in your weclapp account under <code>My settings &gt; API.</code>',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				AuthenticationToken: '={{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ `https://${$credentials.tenant}.weclapp.com/webapp/api/v2` }}',
			url: '/user/count',
			method: 'GET',
		},
	};
}
