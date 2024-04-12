module.exports = {
  '*.{js,ts,css,json,md,yaml,yml}': ['prettier --write'],
  '*.md': (filenames) => {
    const list = filenames.map((filename) => `'markdown-toc -i ${filename}`);
    return list;
  },
  '*.{js,ts}': ['eslint --fix'],
};
