import { ALLOWED_OPERATORS } from './allowed';
import { QueryObject, processObject } from './utils';

export function validateQuery(
  queryObj: QueryObject,
  allowedOperators: typeof ALLOWED_OPERATORS = ALLOWED_OPERATORS
): { isValidQuery: boolean; invalidFields: string[] } | never {
  const invalidFields: string[] = [];
  const stack: { obj: QueryObject; path: string }[] = [
    { obj: queryObj, path: '' },
  ];

  while (stack.length > 0) {
    const { obj, path } = stack.pop()!;
    processObject(obj, path, allowedOperators, invalidFields, stack);
  }

  return {
    isValidQuery: !invalidFields.length,
    invalidFields,
  };
}
