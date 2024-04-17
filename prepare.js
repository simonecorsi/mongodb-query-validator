'use strict';

let isCi = false;

import('is-cia')
  .then((mod) => {
    isCi = mod.default;
  })
  .catch(() => {})
  .finally(() => {
    return import('husky').then((mod) => {
      if (!isCi) {
        mod.default();
      }
    });
  });
