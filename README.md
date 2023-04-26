[npm]: https://img.shields.io/npm/v/ranlexer
[npm-url]: https://www.npmjs.com/package/ranlexer
[size]: https://packagephobia.now.sh/badge?p=ranlexer
[size-url]: https://packagephobia.now.sh/result?p=ranlexer

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# ranlexer

A lightweight ast generator and compiler.(Currently only js is supported, and the function of ast parsing into code is still under development)

## Install

Using npm:

```console
npm install ranlexer --save-dev
```

## Usage

ranlexer can export three methods：

- parse：Parse the code into an ast:
- generate：Parse the ast into code
- build：A lightweight build tool that supports treeshaking

### parse

Parse the code into an ast:

```ts
import { parse } from 'ranlexer'

const code = 'let a = 1;'
const ast = parse(code)
```

### generate

Parse the ast into code

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
const code = generate(ast)
```

### build

A lightweight build tool that supports treeshaking

```ts
import { build } from 'ranlexer'

const bundle = await build(option)
```

Generate a bundle by passing in options，All options are, well, optional:

- input： Build entry, if not set, has a default value. The default value is `./index.js`
- output = Path to the build output file. If not set, the default value is `./dist/index.js`

The bundle has two methods,

One is to output the built code directly,

```ts
const code = bundle.generate()
```

and the other is to output the file to a directory.

```ts
bundle.write()
```

### Meta

[LICENSE (MIT)](/LICENSE)
