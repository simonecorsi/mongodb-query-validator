import { ALLOWED_OPERATORS } from './allowed';
export type QueryObject = Record<string, unknown>;
export declare function processObject(obj: QueryObject, path: string, allowedOperators: typeof ALLOWED_OPERATORS, invalidFields: string[], stack: {
    obj: QueryObject;
    path: string;
}[]): void;
export declare function validateField(key: string, path: string, allowedOperators: typeof ALLOWED_OPERATORS, invalidFields: string[]): void;
