import { ALLOWED_OPERATORS } from './allowed';

export type QueryObject = Record<string, unknown>;

export function processObject(
  obj: QueryObject,
  path: string,
  allowedOperators: typeof ALLOWED_OPERATORS,
  invalidFields: string[],
  stack: { obj: QueryObject; path: string }[]
): void {
  for (const key in obj) {
    const newPath = path ? `${path}.${key}` : key;

    // validate the current
    validateField(key, newPath, allowedOperators, invalidFields);

    // if the object value is an object traverse it
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      stack.push({ obj: obj[key] as QueryObject, path: newPath });
    }
  }
}

export function validateField(
  key: string,
  path: string,
  allowedOperators: typeof ALLOWED_OPERATORS,
  invalidFields: string[]
): void {
  // only validate key starting with $ to check of invalid MongoDB uperator
  // eg: $exists is valid $exist is a common typo
  if (key.startsWith('$') && !allowedOperators.includes(key)) {
    invalidFields.push(path);
  }
}
