# SMOB 🧪

[![npm version](https://badge.fury.io/js/smob.svg)](https://badge.fury.io/js/smob)
[![main](https://github.com/tada5hi/smob/actions/workflows/main.yml/badge.svg)](https://github.com/tada5hi/smob/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/tada5hi/smob/branch/master/graph/badge.svg?token=0VL41WO0CG)](https://codecov.io/gh/tada5hi/smob)
[![Known Vulnerabilities](https://snyk.io/test/github/Tada5hi/smob/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Tada5hi/smob?targetFile=package.json)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Zero dependency library to **s**afe **m**erge **ob**jects.

**Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
  - [Merger](#merger)
- [License](#license)

## Installation

```bash
npm install smob --save
```

## Usage

```typescript
import { merge } from "smob";

const ob = merge(target, ...sources);
```

The following merge options are set by default:
- **priority**: `left`
  The source aka leftmost object has by **default** the highest priority.
- **array**: `true`
  Merge source and target arrays by priority order.
- **arrayDistinct**: `false` Remove duplicates, when merging array properties.

The merge behaviour can be changed by creating a custom [merger](#merger).

**Arguments**
- target `Record<string, any>`: The destination object to merge the source object(s).
- sources `Record<string, any>[]`: The source object(s).

```typescript
import { merge } from 'smob';

console.log(merge({ a: 1 }, { a: 2 }, { a: 3 }));
// => { a: 1 }
```

### Merger

A custom merger can simply be created by using the `createMerger` method.

**Priority**
```typescript
import { createMerger } from 'smob';

const merge = createMerger({ priority: 'right' });

console.log(merge({ a: 1 }, { a: 2 }, { a: 3 }));
// => { a: 3 }
```

**Array**
```typescript
import { createMerger } from 'smob';

const merge = createMerger({ array: false });

console.log(merge({ a: [1,2,3] }, { a: [4,5,6] }));
// => { a: [1,2,3] }
```

**ArrayDistinct**
```typescript
import { createMerger } from 'smob';

const merge = createMerger({ arrayDistinct: true });

console.log(merge({ a: [1,2,3] }, { a: [3,4,5] }));
// => { a: [1,2,3,4,5] }
```

**Strategy**
```typescript
import { createMerger } from 'smob';

const merge = createMerger({
    strategy: (target, key, value) => {
        if (
            typeof target[key] === 'number' &&
            typeof value === 'number'
        ) {
            target[key] += value;
            return target;
        }

        return undefined;
    }
});

console.log(merge({ a: 1 }, { a: 2 }, { a: 3 }));
// => { a: 6 }
```

Return **undefined** if the default merge behaviour should be used for the current target source pair.

## License

Made with 💚

Published under [MIT License](./LICENSE).
