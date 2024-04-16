import { ALLOWED_OPERATORS } from './allowed';

function validateField(
  key: string,
  path: string,
  allowedOperators: typeof ALLOWED_OPERATORS
): boolean {
  // only validate key starting with $ to check of invalid MongoDB uperator
  // eg: $exists is valid $exist is a common typo
  if (key.startsWith('$') && !allowedOperators.includes(key)) {
    return false;
  }
  return true;
}

export function validateQueryRecurse(
  obj,
  maxDepth: number = 0, // 0 it's up to infinity
  path = '',
  currentDepth = 0,
  invalidFields: string[] = []
) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const fullPath = path ? `${path}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        if (
          // If 0 it's up to infinity
          maxDepth === 0 ||
          currentDepth < maxDepth
        ) {
          validateQueryRecurse(
            value,
            maxDepth,
            fullPath,
            currentDepth + 1,
            invalidFields
          ); // recursively recurse nested objects
        }
      } else {
        // the first invalid field
        if (!validateField(key, fullPath, ALLOWED_OPERATORS)) {
          invalidFields.push(fullPath);
        }
      }
    }
  }
  return {
    isValidQuery: invalidFields.length === 0,
    invalidFields,
  };
}
