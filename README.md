# ranlexer

A lightweight JavaScript generator and compiler.

[npm]: https://img.shields.io/npm/v/ranlexer
[npm-url]: https://www.npmjs.com/package/ranlexer
[size]: https://packagephobia.now.sh/badge?p=ranlexer
[size-url]: https://packagephobia.now.sh/result?p=ranlexer

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

## Install

Using npm:

```console
npm install ranlexer --save
```

## Usage

ranlexer can export three methods

- **parse**: Parse the code into an ast
- **walk**: Walk through the structure of the ast to perform custom operations
- **generate**: Parse the ast into code
- **build**: A lightweight build tool that supports treeshaking

### parse

Parse the code into an ast:

```ts
import { parse } from 'ranlexer'

const code = 'let a = 1;'
const ast = parse(code)
```

### walk

Walk through the structure of the ast to perform custom operations

There are two options：

- **ast**: ast structure node
- **opts**: One object with two methods in it

```ts
// Export the type of the ast node
import type { Types } from 'ranlexer'

const opts = {
  enter: (node: types.Node) => {
    // Enter the processing of the node
  },
  leave: (node: types.Node) => {
    // Leave the node processing
  }
walk(ast, opts)

```

### generate

Parse the ast into code:

```ts
import { generate } from 'ranlexer'

const ast = {
  type: NodeType.Program,
  start: 0,
  end: 9,
  body: [
    {
      type: NodeType.VariableDeclaration,
      start: 0,
      end: 9,
      declarations: [
        {
          type: NodeType.VariableDeclarator,
          id: {
            type: NodeType.Identifier,
            name: 'a',
            start: 4,
            end: 5,
          },
          start: 4,
          end: 9,
          init: {
            type: NodeType.Literal,
            value: '1',
            raw: '1',
            start: 8,
            end: 9,
          },
        },
      ],
      kind: 'let',
    },
  ],
}
const code = generate(ast) // 'let a = 1;'
```

### build

A lightweight build tool that supports treeshaking

```ts
import { build } from 'ranlexer'

const bundle = await build(option)
```

Generate a bundle by passing in options，All options are well, optional:

- **input**: Build entry, if not set, the default value is `./index.js`
- **output**: Path to the build output file. If not set, the default value is `./dist/index.js`

The bundle has two methods:

- **generate**: generate is to output the built code directly,

```ts
const code = bundle.generate()
```

- **write**: write is to output the file to a directory.

```ts
bundle.write()
```

### Meta

[LICENSE (MIT)](/LICENSE)
