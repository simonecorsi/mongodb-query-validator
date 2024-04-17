import tap from 'tap';
import { validateQuery } from '../src/index.ts';
import { ALLOWED_OPERATORS } from '../src/allowed.ts';

function generateNestedObject(options: {
  valid: boolean;
  levels: number;
}): Record<string, unknown> {
  if (options.levels === 1) {
    return { [options.valid ? '$exists' : '$exist']: false };
  }

  const obj: Record<string, unknown> = {};
  obj[`level${options.levels}`] = generateNestedObject({
    levels: options.levels - 1,
    valid: options.valid,
  });
  return obj;
}

tap.test('Should parse valid queries', async (t) => {
  for (const operator of ALLOWED_OPERATORS) {
    t.ok(validateQuery({ [operator]: {} })?.isValidQuery);
  }
});

tap.test('Should not parse invalid operator', async (t) => {
  t.notOk(validateQuery({ ok: { $exist: 1 } })?.isValidQuery);
});

tap.test('Should provide insight on invalid fields', async (t) => {
  for (const operator of ALLOWED_OPERATORS) {
    const invalidOp = `${operator}_INVALID`;
    const parsed = validateQuery({ [invalidOp]: 'any' });
    t.ok(parsed.invalidFields.includes(invalidOp));
    t.notOk(parsed.isValidQuery);
  }
});

tap.test('Should handle deep nested INVALID objects', async (t) => {
  const DEPTH = 1000;
  const { isValidQuery, invalidFields } = validateQuery(
    generateNestedObject({ valid: false, levels: DEPTH })
  );
  t.notOk(isValidQuery);
  t.ok(invalidFields[0].split('.').length === DEPTH);
});

tap.test('Should handle deep nested VALID objects', async (t) => {
  const DEPTH = 1000;
  const { isValidQuery } = validateQuery(
    generateNestedObject({ valid: true, levels: DEPTH })
  );
  t.ok(isValidQuery);
});

tap.test('Should limit depth if user provide option', async (t) => {
  const DEPTH = 1000;
  const MAX_DEPTH = 10;
  const { isValidQuery } = validateQuery(
    generateNestedObject({ valid: false, levels: DEPTH }),
    MAX_DEPTH
  );
  t.ok(isValidQuery);
});
