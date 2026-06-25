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
		displayName: 'Filter Mode',
		name: 'filterMode',
		type: 'options',
		options: [
			{
				name: 'Basic',
				value: 'basic',
				description: 'Use the standard n8n filter builder',
			},
			{
				name: 'Advanced',
				value: 'advanced',
				description: 'Use all weclapp operators and per-condition combinations',
			},
		],
		default: 'basic',
		routing: {
			send: {
				preSend: [addFilterQuery],
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'filter',
		default: '',
		placeholder: 'Add Filter',
		typeOptions: {
			filter: {
				version: 3,
				caseSensitive: true,
				typeValidation: 'loose',
				allowedCombinators: ['and', 'or'],
			},
		},
		displayOptions: {
			show: {
				filterMode: ['basic'],
			},
		},
		description:
			'Use the weclapp property name, including nested properties such as customAttribute3387.value, as the left value.',
	},
	{
		displayName: 'Advanced Filters',
		name: 'advancedFilters',
		type: 'fixedCollection',
		default: '',
		placeholder: 'Add Filter',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				filterMode: ['advanced'],
			},
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
						options: advancedOperators,
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
						description:
							'For In and Not In, enter a JSON array such as ["1006","1007"]',
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
