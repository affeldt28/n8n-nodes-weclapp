import type {
	FilterConditionValue,
	FilterTypeCombinator,
	FilterValue,
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

type AdvancedFilterCombination = 'and' | 'or' | 'orGroup';

interface AdvancedFilterCondition {
	combination?: AdvancedFilterCombination;
	groupName?: string;
	operator?: string;
	property?: string;
	value?: unknown;
}

const basicOperatorMap: Record<string, string> = {
	after: 'gt',
	afterOrEquals: 'ge',
	before: 'lt',
	beforeOrEquals: 'le',
	empty: 'null',
	equals: 'eq',
	gt: 'gt',
	gte: 'ge',
	lt: 'lt',
	lte: 'le',
	notEmpty: 'notnull',
	notEquals: 'ne',
};

const advancedOperators = [
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

export const filterQueryParameters: INodeProperties[] = [
	{
		name: 'filterMode',
		displayName: 'Filter Mode',
		type: 'options',
		default: 'basic',
		options: [
			{
				name: 'Basic',
				description: 'Use the standard n8n filter builder',
				value: 'basic',
			},
			{
				name: 'Advanced',
				description: 'Use all weclapp operators and per-condition combinations',
				value: 'advanced',
			},
		],
		routing: {
			send: {
				preSend: [addFilterQuery],
			},
		},
	},
	{
		name: 'filters',
		displayName: 'Filters',
		description:
			'Use the weclapp property name, including nested properties such as customAttribute3387.value, as the left value.',
		type: 'filter',
		typeOptions: {
			filter: {
				version: 3,
				caseSensitive: true,
				typeValidation: 'loose',
				allowedCombinators: ['and', 'or'],
			},
		},
		default: '',
		placeholder: 'Add Filter',
		displayOptions: {
			show: {
				filterMode: ['basic'],
			},
		},
	},
	{
		name: 'advancedFiltersNotice',
		displayName:
			'Use weclapp filter syntax for advanced filters. See the <a href="https://www.weclapp.com/api/#overview--filtering" target="_blank">weclapp filtering documentation</a> for supported operators and examples.',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				filterMode: ['advanced'],
			},
		},
	},
	{
		name: 'advancedFilters',
		displayName: 'Advanced Filters',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: '',
		placeholder: 'Add Filter',
		displayOptions: {
			show: {
				filterMode: ['advanced'],
			},
		},
		options: [
			{
				name: 'conditions',
				displayName: 'Condition',
				values: [
					{
						name: 'property',
						displayName: 'Property',
						description:
							'weclapp property to filter, including nested properties such as customAttribute3387.value',
						type: 'string',
						default: '',
						placeholder: 'e.g. createdDate',
						required: true,
					},
					{
						name: 'operator',
						displayName: 'Operator',
						type: 'options',
						default: 'eq',
						options: advancedOperators,
					},
					{
						name: 'value',
						displayName: 'Value',
						description:
							'For In and Not In, enter a JSON array such as ["1006","1007"]',
						type: 'string',
						default: '',
						displayOptions: {
							hide: {
								operator: ['null', 'notnull'],
							},
						},
					},
					{
						name: 'combination',
						displayName: 'Combine With',
						type: 'options',
						default: 'and',
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
					},
					{
						name: 'groupName',
						displayName: 'OR Group Name',
						description:
							'Conditions with the same group name are ORed together; separate groups are ANDed',
						type: 'string',
						default: 'Group1',
						required: true,
						displayOptions: {
							show: {
								combination: ['orGroup'],
							},
						},
					},
				],
			},
		],
	},
];

function addQueryValue(query: Record<string, string | string[]>, key: string, value: string) {
	const existingValue = query[key];

	if (existingValue === undefined) {
		query[key] = value;
	} else if (Array.isArray(existingValue)) {
		existingValue.push(value);
	} else {
		query[key] = [existingValue, value];
	}
}

function getBasicOperator(condition: FilterConditionValue): string {
	if (condition.operator.operation === 'true' || condition.operator.operation === 'false') {
		return 'eq';
	}

	const operator = basicOperatorMap[condition.operator.operation];
	if (!operator) {
		throw new TypeError(
			`The basic operator "${condition.operator.operation}" is not supported by weclapp. Use Advanced filter mode for weclapp-specific operators.`,
		);
	}

	return operator;
}

function getBasicFilterKey(
	condition: FilterConditionValue,
	combinator: FilterTypeCombinator,
): string {
	const property = String(condition.leftValue ?? '').trim();
	if (!property) {
		throw new TypeError('A property name is required as the left value');
	}

	const prefix = combinator === 'or' ? 'or-' : '';
	return `${prefix}${property}-${getBasicOperator(condition)}`;
}

function getBasicFilterValue(condition: FilterConditionValue): string {
	const operation = condition.operator.operation;

	if (operation === 'empty' || operation === 'notEmpty') {
		return '';
	}

	if (operation === 'true' || operation === 'false') {
		return operation;
	}

	return String(condition.rightValue ?? '');
}

function shouldSkipBasicFilter(condition: FilterConditionValue): boolean {
	const isPropertyEmpty = String(condition.leftValue ?? '').trim() === '';
	const isValueEmpty = String(condition.rightValue ?? '').trim() === '';

	if (isPropertyEmpty && isValueEmpty) return true;

	return false;
}

function buildBasicFilterQuery(filters: FilterValue): IDataObject {
	const query: Record<string, string | string[]> = {};
	const combinator = filters.combinator ?? 'and';

	for (const condition of filters.conditions ?? []) {
		if (shouldSkipBasicFilter(condition)) continue;

		addQueryValue(
			query,
			getBasicFilterKey(condition, combinator),
			getBasicFilterValue(condition),
		);
	}

	return query;
}

function getAdvancedFilterKey(condition: AdvancedFilterCondition): string {
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

function getAdvancedFilterValue(condition: AdvancedFilterCondition): string {
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

function buildAdvancedFilterQuery(conditions: AdvancedFilterCondition[]): IDataObject {
	const query: Record<string, string | string[]> = {};

	for (const condition of conditions) {
		if (!condition.property?.trim()) continue;

		addQueryValue(query, getAdvancedFilterKey(condition), getAdvancedFilterValue(condition));
	}

	return query;
}

async function addFilterQuery(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const filterMode = this.getNodeParameter('filterMode', 'basic') as string;

	try {
		let query: IDataObject;

		if (filterMode === 'advanced') {
			const filters = this.getNodeParameter('advancedFilters', {}) as IDataObject;
			const conditions = (filters.conditions ?? []) as unknown as AdvancedFilterCondition[];
			query = buildAdvancedFilterQuery(conditions);
		} else {
			const filters = this.getNodeParameter('filters', {}) as FilterValue;
			query = buildBasicFilterQuery(filters);
		}

		if (Object.keys(query).length === 0) {
			return requestOptions;
		}

		requestOptions.qs = {
			...requestOptions.qs,
			...query,
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
