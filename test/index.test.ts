import tap from 'tap';
import { validateQuery } from '../src/index.ts';
import { ALLOWED_OPERATORS } from '../src/allowed.ts';

tap.test('Should parse valid queries', async (t) => {
  for (const operator of ALLOWED_OPERATORS) {
    const parsed = validateQuery({ [operator]: {} });
    t.ok(parsed.isValidQuery);
  }

  t.ok(validateQuery({ ok: { nesting: { so: { much: { $exists: 1 } } } } }));
});

tap.test('Should provide insight on invalid fields', async (t) => {
  for (const operator of ALLOWED_OPERATORS) {
    const invalidOp = `${operator}_INVALID`;
    const parsed = validateQuery({ [invalidOp]: 'any' });
    t.ok(parsed.invalidFields.includes(invalidOp));
    t.notOk(parsed.isValidQuery);
  }

  const nested = validateQuery({
    ok: { nesting: { so: { much: { $exist: 1 } } } },
  });
  t.ok(nested.invalidFields.includes('ok.nesting.so.much.$exist'));
  t.notOk(nested.isValidQuery);
});

// TODO Test nested object
