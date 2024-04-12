import { ALLOWED_OPERATORS } from './allowed';
import { QueryObject } from './utils';
export declare function validateQuery(queryObj: QueryObject, allowedOperators?: typeof ALLOWED_OPERATORS): {
    isValidQuery: boolean;
    invalidFields: string[];
} | never;
