import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

type FilterCombination = 'and' | 'or' | 'orGroup';

interface FilterCondition {
	combination?: FilterCombination;
	groupName?: string;
	operator?: string;
	property?: string;
	value?: unknown;
}

const operators = [
	{ name: 'Equal', value: 'eq' },
	{ name: 'Not Equal', value: 'ne' },
	{ name: 'Less Than', value: 'lt' },
	{ name: 'Greater Than', value: 'gt' },
	{ name: 'Less Than or Equal', value: 'le' },
	{ name: 'Greater Than or Equal', value: 'ge' },
	{ name: 'Is Null', value: 'null' },
	{ name: 'Is Not Null', value: 'notnull' },
	{ name: 'Like', value: 'like' },
	{ name: 'Not Like', value: 'notlike' },
	{ name: 'Like (Case Insensitive)', value: 'ilike' },
	{ name: 'Not Like (Case Insensitive)', value: 'notilike' },
	{ name: 'In', value: 'in' },
	{ name: 'Not In', value: 'notin' },
];

export const filterQueryParameter: INodeProperties = {
	displayName: 'Filters',
	name: 'filters',
	type: 'fixedCollection',
	default: {},
	placeholder: 'Add Filter',
	typeOptions: {
		multipleValues: true,
	},
	options: [
		{
			displayName: 'Condition',
			name: 'conditions',
			values: [
				{
					displayName: 'Property',
					name: 'property',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'createdDate',
					description:
						'weclapp property to filter, including nested properties such as customAttribute3387.value',
				},
				{
					displayName: 'Operator',
					name: 'operator',
					type: 'options',
					options: operators,
					default: 'eq',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					displayOptions: {
						hide: {
							operator: ['null', 'notnull'],
						},
					},
					description: 'For In and Not In, enter a JSON array such as ["1006","1007"]',
				},
				{
					displayName: 'Combine With',
					name: 'combination',
					type: 'options',
					options: [
						{
							name: 'AND',
							value: 'and',
						},
						{
							name: 'OR',
							value: 'or',
						},
						{
							name: 'Named OR Group',
							value: 'orGroup',
						},
					],
					default: 'and',
				},
				{
					displayName: 'OR Group Name',
					name: 'groupName',
					type: 'string',
					default: 'Group1',
					required: true,
					displayOptions: {
						show: {
							combination: ['orGroup'],
						},
					},
					description:
						'Conditions with the same group name are ORed together; separate groups are ANDed',
				},
			],
		},
	],
	routing: {
		send: {
			preSend: [addFilterQuery],
		},
	},
};

function getFilterKey(condition: FilterCondition): string {
	const property = condition.property?.trim() ?? '';
	const operator = condition.operator ?? 'eq';

	if (condition.combination === 'or') {
		return `or-${property}-${operator}`;
	}

	if (condition.combination === 'orGroup') {
		return `or${condition.groupName?.trim() ?? ''}-${property}-${operator}`;
	}

	return `${property}-${operator}`;
}

function getFilterValue(condition: FilterCondition): string {
	if (condition.operator === 'null' || condition.operator === 'notnull') {
		return '';
	}

	const value = String(condition.value ?? '');

	if (condition.operator === 'in' || condition.operator === 'notin') {
		const parsedValue: unknown = JSON.parse(value);
		if (!Array.isArray(parsedValue)) {
			throw new TypeError('The value must be a JSON array');
		}
		return JSON.stringify(parsedValue);
	}

	return value;
}

function buildFilterQuery(conditions: FilterCondition[]): IDataObject {
	const query: Record<string, string | string[]> = {};

	for (const condition of conditions) {
		const property = condition.property?.trim();
		if (!property) continue;

		const key = getFilterKey(condition);
		const value = getFilterValue(condition);
		const existingValue = query[key];

		if (existingValue === undefined) {
			query[key] = value;
		} else if (Array.isArray(existingValue)) {
			existingValue.push(value);
		} else {
			query[key] = [existingValue, value];
		}
	}

	return query;
}

async function addFilterQuery(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const filters = this.getNodeParameter('filters', {}) as IDataObject;
	const conditions = (filters.conditions ?? []) as unknown as FilterCondition[];

	try {
		requestOptions.qs = {
			...requestOptions.qs,
			...buildFilterQuery(conditions),
		};
		requestOptions.arrayFormat = 'repeat';
		return requestOptions;
	} catch (error) {
		throw new NodeOperationError(
			this.getNode(),
			`Invalid weclapp filter: ${error instanceof Error ? error.message : String(error)}`,
		);
	}
}
