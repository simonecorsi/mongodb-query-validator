export declare function validateQuery(
  obj: Record<string, unknown>,
  maxDepth?: number
): {
  isValidQuery: boolean;
  invalidFields: string[];
};
export default validateQuery;
