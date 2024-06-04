export const ALLOWED_OPERATORS = [
  // Comparison Operators
  '$eq',
  '$gt',
  '$gte',
  '$lt',
  '$lte',
  '$ne',
  '$in',
  '$nin',
  // Logical Operators
  '$and',
  '$or',
  '$not',
  '$nor',
  // Element Operators
  '$exists',
  '$type',
  // Array Operators
  '$all',
  '$elemMatch',
  '$size',
  // Evaluation Operators
  '$expr',
  '$jsonSchema',
  // Geospatial Operators
  '$geoWithin',
  '$geoIntersects',
  // Text Search Operators
  '$text',
  // Bitwise Operators
  '$bitsAllSet',
  '$bitsAnySet',
  '$bitsAllClear',
  // regexp
  '$regex',
  '$options',
];
