# mongodb-query-validator

<!-- ![tests](https://github.com/simonecorsi/mongodb-query-validator/workflows/test/badge.svg) -->

> ✅ Zero Dependency MongoDB Query Operator Validator, why bother the database when you can save network rount-trip and CPU cycles?

## Table of Contents

<!-- toc -->

- [About](#about)
  * [Benefits](#benefits)
  * [Use Cases](#use-cases)
- [Installation](#installation)
- [Usage](#usage)
- [Valid query Operators](#valid-query-operators)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<!-- tocstop -->

## About

Do you ever find yourself squinting at your MongoDB queries, only to realize you've made a tiny typo that's causing a big headache? We've been there too. That's why we built this nifty little tool – to save you from those pesky errors and wasted database trips.

### Benefits

- **Error-Free Queries**: Say goodbye to query typos and syntax errors. Our validator catches them before they cause any trouble.
- **Efficiency Boost**: Streamline your development process by validating queries upfront, saving you time and resources.

### Use Cases

- **Production Systems**: Enhance the robustness of production systems by validating queries before executing them in live environments, minimizing downtime and errors.
- **Development Environments**: Validate queries during development to catch errors early and streamline the debugging process.
- **Testing Processes**: Integrate query validation into testing pipelines to ensure query correctness and reliability.

<!-- GETTING STARTED -->

## Installation

```sh
npm i --save mongodb-query-validator
# OR
yarn add mongodb-query-validator
```

<!-- USAGE EXAMPLES -->

## Usage

```ts
import { validateQuery } from './src/index';

const { isValidQuery } = validateQuery({ myField: { nested: { $gte: 123 } } });
// isValidQuery = true

const { isValidQuery, invalidFields } = validateQuery({
  myField: { nested: { $exist: true } },
});
// isValidQuery = false
// invalidFields = ["myField.nexted.$exist"]
```

## Valid query Operators

You can find all supported query operator [here](./src/allowed.ts)

## Contributing

Project is pretty simple and straight forward for what is my needs, but if you have any idea you're welcome.

This projects uses [commitlint](https://commitlint.js.org/) with Angular configuration so be sure to use standard commit format or PR won't be accepted.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat(scope): some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Simone Corsi - [@im_simonecorsi](https://twitter.com/im_simonecorsi)
