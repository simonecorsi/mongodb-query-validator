# mongodb-query-validator

> ✅ Zero Dependency MongoDB Query Operator Validator. Why bother the database when you can save network round trips and CPU cycles?

## Table of Contents

<!-- toc -->
- [About](#about)
  * [Benefits](#benefits)
  * [Use Cases](#use-cases)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Valid query operators](#valid-query-operators)
- [Contributing](#contributing)
- [Development](#development)
- [License](#license)
- [Contact](#contact)
<!-- tocstop -->

## About

Do you ever find yourself squinting at your MongoDB queries, only to realize you've made a tiny typo that's causing a big headache? We've been there too. That's why this library exists: to catch those mistakes before they hit the database.

### Benefits

- **Error-Free Queries** – Say goodbye to query typos and syntax errors. The validator catches them before they cause trouble.
- **Efficiency Boost** – Streamline your development process by validating queries upfront, saving you time and resources.

### Use Cases

- **Production Systems** – Validate queries before executing them in live environments to minimize downtime and errors.
- **Development Environments** – Catch mistakes early while you're building features.
- **Testing Processes** – Integrate query validation into your testing pipelines to ensure correctness and reliability.

## Installation

```sh
npm i --save mongodb-query-validator
# OR
yarn add mongodb-query-validator
```

## Usage

```ts
import { validateQuery } from 'mongodb-query-validator';

const { isValidQuery } = validateQuery({ myField: { nested: { $gte: 123 } } });
// isValidQuery = true

const { isValidQuery: valid, invalidFields } = validateQuery({
  myField: { nested: { $exist: true } },
});
// valid = false
// invalidFields = ["myField.nested.$exist"]
```

## API

`validateQuery(query[, maxDepth])`

- **query** – An object representing your MongoDB query.
- **maxDepth** *(optional)* – Limit how deep the validator should traverse nested objects. `0` (default) means unlimited depth.

Returns an object with:

- `isValidQuery` – `true` if no invalid operators are found.
- `invalidFields` – an array of paths to the invalid fields.

Type definitions are available in [`types/index.d.ts`](./types/index.d.ts).

## Valid query operators

The full list of supported operators can be found in [`src/allowed.ts`](./src/allowed.ts).

## Contributing

Contributions are welcome! Please use [Conventional Commits](https://www.conventionalcommits.org/) when crafting your commit messages.

1. Fork the repository and create your branch (`git checkout -b feat/my-feature`).
2. Install dependencies with `npm i`.
3. Add your changes and tests.
4. Run the test suite with `npm test`.
5. Commit using the `feat`, `fix`, or other conventional prefixes.
6. Push your branch and open a pull request.

## Development

- **Build** – `npm run build` compiles TypeScript to `dist/`.
- **Tests** – `npm test` runs the tap test suite. Use this before submitting PRs.
- **Coverage** – `npm run coverage` generates an HTML coverage report.

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE.md) for more information.

## Contact

Simone Corsi – [@im_simonecorsi](https://twitter.com/im_simonecorsi)
