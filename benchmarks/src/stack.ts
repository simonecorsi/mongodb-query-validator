import { ALLOWED_OPERATORS } from './allowed';

type QueryObject = Record<string, unknown>;

function processObject(
  obj: QueryObject,
  path: string,
  allowedOperators: typeof ALLOWED_OPERATORS,
  invalidFields: string[],
  stack: { obj: QueryObject; path: string }[]
): void {
  for (const key in obj) {
    const newPath = path ? `${path}.${key}` : key;

    // validate the current
    const isValidField = validateField(key, allowedOperators);
    if (!isValidField) {
      invalidFields.push(path);
    }

    // if the object value is an object traverse it
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      stack.push({ obj: obj[key] as QueryObject, path: newPath });
    }
  }
}

function validateField(
  key: string,
  allowedOperators: typeof ALLOWED_OPERATORS
): boolean {
  // only validate key starting with $ to check of invalid MongoDB uperator
  // eg: $exists is valid $exist is a common typo
  if (key.startsWith('$') && !allowedOperators.includes(key)) {
    return false;
  }
  return true;
}

export function validateQueryStack(
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
