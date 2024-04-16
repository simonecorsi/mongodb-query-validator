import { Bench, Fn } from 'tinybench';
import { validateQueryStack } from './src/stack';
import { validateQueryRecurse } from './src/recurse';

const bench = new Bench();

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

const tests: [string, Fn][] = [
  [
    'Stack: Invalid top-level object',
    () =>
      validateQueryStack(
        generateNestedObject({
          levels: 1,
          valid: false,
        })
      ),
  ],
  [
    'Stack: Invalid top-level nested',
    () =>
      validateQueryStack(
        generateNestedObject({
          levels: 100,
          valid: false,
        })
      ),
  ],

  [
    'Recursion: Invalid top-level object',
    () =>
      validateQueryRecurse(
        generateNestedObject({
          levels: 1,
          valid: false,
        })
      ),
  ],
  [
    'Recursion: Invalid top-level nested',
    () =>
      validateQueryRecurse(
        generateNestedObject({
          levels: 100,
          valid: false,
        })
      ),
  ],
];

for (const [label, test] of tests) {
  bench.add(label as string, test);
}

// I don't have top level await
bench.warmup().then(() => {
  bench.run().then(() => console.table(bench.table()));
});
