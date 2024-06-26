# ranlexer

Tiny JavaScript ast parser and generator

---

<a href="https://github.com/chaxus/ranlexer/actions"><img src="https://img.shields.io/github/actions/workflow/status/chaxus/ranlexer/main.yml" alt="Build Status"></a>
<a href="https://npmjs.com/package/ranlexer"><img src="https://img.shields.io/npm/v/ranlexer.svg" alt="npm-v"></a>
<a href="https://npmjs.com/package/ranlexer"><img src="https://img.shields.io/npm/dt/ranlexer.svg" alt="npm-d"></a>
<a href="https://bundlephobia.com/result?p=ranlexer"><img src="https://img.badgesize.io/https:/unpkg.com/ranlexer/dist/index.umd.js?label=brotli&compression=brotli" alt="brotli"></a>
<a href="#alternative-installation-methods"><img src="https://img.shields.io/badge/module%20formats-umd%2C%20esm-green.svg" alt="module formats: umd, esm"></a>

## Install

Using npm:

```console
npm install ranlexer --save
```

## Library Progress

This library is still under active development. Most common code manipulation/generation use cases are implemented, but there's still a lot of work to do. Please open an issue if you find a feature missing, bug, or question that isn't in the issue.

## Usage

ranlexer can export the following methods

- **parse**: Parse the code into an ast
- **walk**: Walk through the structure of the ast to perform custom operations
- **generate**: Parse the ast into code
- **build**: A lightweight build tool that supports treeshaking

### parse

Parse the code into an ast:

```ts
import { parse } from 'ranlexer';

const code = 'let a = 1;';
const ast = parse(code);
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
  enter: (node: Types.Node) => {
    // Enter the processing of the node
  },
  leave: (node: Types.Node) => {
    // Leave the node processing
  }
walk(ast, opts)

```

### generate

Parse the ast into code:

```ts
import { generate } from 'ranlexer';

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
};
const code = generate(ast); // 'let a = 1;'
```

### build

A lightweight build tool that supports treeshaking

```ts
import { build } from 'ranlexer';

const bundle = await build(option);
```

Generate a bundle by passing in options，All options are well, optional:

- **input**: Build entry, if not set, the default value is `./index.js`
- **output**: Path to the build output file. If not set, the default value is `./dist/index.js`
- **external**: String array，the modules in the array are not built

The bundle has two methods:

- **generate**: generate is to output the built code directly,

```ts
import { build } from 'ranlexer';

const bundle = await build(option);

const code = bundle.generate();
```

- **write**: write is to output the file to a directory.

```ts
import { build } from 'ranlexer';

const bundle = await build(option);

bundle.write();
```

## Visitors

![](http://profile-counter.glitch.me/chaxus-ranlexer/count.svg)

## Meta

[LICENSE (MIT)](/LICENSE)
