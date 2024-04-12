import { validateQuery } from './src/index';

const res = validateQuery({ $gt: 'any' });

console.log('res :>> ', res);
