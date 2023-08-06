const code = `
import { useState, useEffect } from 'react'

const app = () => {
  	const click = () => {}
    const [state, setState] = useState([])
    useEffect(()=>{},[])
	return (
      <>
       <div className="app" onClick={click}>this is test jsx</div>
	   <div className="contain" onClick={click}>
         <span>child</span>
       </div>
		{state.length ? <h1>this is h1</h1> : <h2>this is h2</h2>}
        {state.map(item=>{
        	return <p key={item.key}>{item.value}</p>
        })}
      </>
    )
}
`

// JSXFragment
const ast = {
  type: 'File',
  start: 0,
  end: 502,
  loc: {
    start: {
      line: 1,
      column: 0,
      index: 0,
    },
    end: {
      line: 20,
      column: 0,
      index: 502,
    },
  },
  errors: [],
  program: {
    type: 'Program',
    start: 0,
    end: 502,
    loc: {
      start: {
        line: 1,
        column: 0,
        index: 0,
      },
      end: {
        line: 20,
        column: 0,
        index: 502,
      },
    },
    sourceType: 'module',
    interpreter: null,
    body: [
      {
        type: 'ImportDeclaration',
        start: 0,
        end: 43,
        loc: {
          start: {
            line: 1,
            column: 0,
            index: 0,
          },
          end: {
            line: 1,
            column: 43,
            index: 43,
          },
        },
        specifiers: [
          {
            type: 'ImportSpecifier',
            start: 9,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 9,
                index: 9,
              },
              end: {
                line: 1,
                column: 17,
                index: 17,
              },
            },
            imported: {
              type: 'Identifier',
              start: 9,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 9,
                  index: 9,
                },
                end: {
                  line: 1,
                  column: 17,
                  index: 17,
                },
                identifierName: 'useState',
              },
              name: 'useState',
            },
            importKind: null,
            local: {
              type: 'Identifier',
              start: 9,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 9,
                  index: 9,
                },
                end: {
                  line: 1,
                  column: 17,
                  index: 17,
                },
                identifierName: 'useState',
              },
              name: 'useState',
            },
          },
          {
            type: 'ImportSpecifier',
            start: 19,
            end: 28,
            loc: {
              start: {
                line: 1,
                column: 19,
                index: 19,
              },
              end: {
                line: 1,
                column: 28,
                index: 28,
              },
            },
            imported: {
              type: 'Identifier',
              start: 19,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 19,
                  index: 19,
                },
                end: {
                  line: 1,
                  column: 28,
                  index: 28,
                },
                identifierName: 'useEffect',
              },
              name: 'useEffect',
            },
            importKind: null,
            local: {
              type: 'Identifier',
              start: 19,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 19,
                  index: 19,
                },
                end: {
                  line: 1,
                  column: 28,
                  index: 28,
                },
                identifierName: 'useEffect',
              },
              name: 'useEffect',
            },
          },
        ],
        importKind: 'value',
        source: {
          type: 'StringLiteral',
          start: 36,
          end: 43,
          loc: {
            start: {
              line: 1,
              column: 36,
              index: 36,
            },
            end: {
              line: 1,
              column: 43,
              index: 43,
            },
          },
          extra: {
            rawValue: 'react',
            raw: "'react'",
          },
          value: 'react',
        },
        assertions: [],
      },
      {
        type: 'VariableDeclaration',
        start: 45,
        end: 501,
        loc: {
          start: {
            line: 3,
            column: 0,
            index: 45,
          },
          end: {
            line: 19,
            column: 1,
            index: 501,
          },
        },
        declarations: [
          {
            type: 'VariableDeclarator',
            start: 51,
            end: 501,
            loc: {
              start: {
                line: 3,
                column: 6,
                index: 51,
              },
              end: {
                line: 19,
                column: 1,
                index: 501,
              },
            },
            id: {
              type: 'Identifier',
              start: 51,
              end: 54,
              loc: {
                start: {
                  line: 3,
                  column: 6,
                  index: 51,
                },
                end: {
                  line: 3,
                  column: 9,
                  index: 54,
                },
                identifierName: 'app',
              },
              name: 'app',
            },
            init: {
              type: 'ArrowFunctionExpression',
              start: 57,
              end: 501,
              loc: {
                start: {
                  line: 3,
                  column: 12,
                  index: 57,
                },
                end: {
                  line: 19,
                  column: 1,
                  index: 501,
                },
              },
              id: null,
              generator: false,
              async: false,
              params: [],
              body: {
                type: 'BlockStatement',
                start: 63,
                end: 501,
                loc: {
                  start: {
                    line: 3,
                    column: 18,
                    index: 63,
                  },
                  end: {
                    line: 19,
                    column: 1,
                    index: 501,
                  },
                },
                body: [
                  {
                    type: 'VariableDeclaration',
                    start: 68,
                    end: 90,
                    loc: {
                      start: {
                        line: 4,
                        column: 3,
                        index: 68,
                      },
                      end: {
                        line: 4,
                        column: 25,
                        index: 90,
                      },
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 74,
                        end: 90,
                        loc: {
                          start: {
                            line: 4,
                            column: 9,
                            index: 74,
                          },
                          end: {
                            line: 4,
                            column: 25,
                            index: 90,
                          },
                        },
                        id: {
                          type: 'Identifier',
                          start: 74,
                          end: 79,
                          loc: {
                            start: {
                              line: 4,
                              column: 9,
                              index: 74,
                            },
                            end: {
                              line: 4,
                              column: 14,
                              index: 79,
                            },
                            identifierName: 'click',
                          },
                          name: 'click',
                        },
                        init: {
                          type: 'ArrowFunctionExpression',
                          start: 82,
                          end: 90,
                          loc: {
                            start: {
                              line: 4,
                              column: 17,
                              index: 82,
                            },
                            end: {
                              line: 4,
                              column: 25,
                              index: 90,
                            },
                          },
                          id: null,
                          generator: false,
                          async: false,
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            start: 88,
                            end: 90,
                            loc: {
                              start: {
                                line: 4,
                                column: 23,
                                index: 88,
                              },
                              end: {
                                line: 4,
                                column: 25,
                                index: 90,
                              },
                            },
                            body: [],
                            directives: [],
                          },
                        },
                      },
                    ],
                    kind: 'const',
                  },
                  {
                    type: 'VariableDeclaration',
                    start: 95,
                    end: 133,
                    loc: {
                      start: {
                        line: 5,
                        column: 4,
                        index: 95,
                      },
                      end: {
                        line: 5,
                        column: 42,
                        index: 133,
                      },
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 101,
                        end: 133,
                        loc: {
                          start: {
                            line: 5,
                            column: 10,
                            index: 101,
                          },
                          end: {
                            line: 5,
                            column: 42,
                            index: 133,
                          },
                        },
                        id: {
                          type: 'ArrayPattern',
                          start: 101,
                          end: 118,
                          loc: {
                            start: {
                              line: 5,
                              column: 10,
                              index: 101,
                            },
                            end: {
                              line: 5,
                              column: 27,
                              index: 118,
                            },
                          },
                          elements: [
                            {
                              type: 'Identifier',
                              start: 102,
                              end: 107,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 11,
                                  index: 102,
                                },
                                end: {
                                  line: 5,
                                  column: 16,
                                  index: 107,
                                },
                                identifierName: 'state',
                              },
                              name: 'state',
                            },
                            {
                              type: 'Identifier',
                              start: 109,
                              end: 117,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 18,
                                  index: 109,
                                },
                                end: {
                                  line: 5,
                                  column: 26,
                                  index: 117,
                                },
                                identifierName: 'setState',
                              },
                              name: 'setState',
                            },
                          ],
                        },
                        init: {
                          type: 'CallExpression',
                          start: 121,
                          end: 133,
                          loc: {
                            start: {
                              line: 5,
                              column: 30,
                              index: 121,
                            },
                            end: {
                              line: 5,
                              column: 42,
                              index: 133,
                            },
                          },
                          callee: {
                            type: 'Identifier',
                            start: 121,
                            end: 129,
                            loc: {
                              start: {
                                line: 5,
                                column: 30,
                                index: 121,
                              },
                              end: {
                                line: 5,
                                column: 38,
                                index: 129,
                              },
                              identifierName: 'useState',
                            },
                            name: 'useState',
                          },
                          arguments: [
                            {
                              type: 'ArrayExpression',
                              start: 130,
                              end: 132,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 39,
                                  index: 130,
                                },
                                end: {
                                  line: 5,
                                  column: 41,
                                  index: 132,
                                },
                              },
                              elements: [],
                            },
                          ],
                        },
                      },
                    ],
                    kind: 'const',
                  },
                  {
                    type: 'ExpressionStatement',
                    start: 138,
                    end: 158,
                    loc: {
                      start: {
                        line: 6,
                        column: 4,
                        index: 138,
                      },
                      end: {
                        line: 6,
                        column: 24,
                        index: 158,
                      },
                    },
                    expression: {
                      type: 'CallExpression',
                      start: 138,
                      end: 158,
                      loc: {
                        start: {
                          line: 6,
                          column: 4,
                          index: 138,
                        },
                        end: {
                          line: 6,
                          column: 24,
                          index: 158,
                        },
                      },
                      callee: {
                        type: 'Identifier',
                        start: 138,
                        end: 147,
                        loc: {
                          start: {
                            line: 6,
                            column: 4,
                            index: 138,
                          },
                          end: {
                            line: 6,
                            column: 13,
                            index: 147,
                          },
                          identifierName: 'useEffect',
                        },
                        name: 'useEffect',
                      },
                      arguments: [
                        {
                          type: 'ArrowFunctionExpression',
                          start: 148,
                          end: 154,
                          loc: {
                            start: {
                              line: 6,
                              column: 14,
                              index: 148,
                            },
                            end: {
                              line: 6,
                              column: 20,
                              index: 154,
                            },
                          },
                          id: null,
                          generator: false,
                          async: false,
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            start: 152,
                            end: 154,
                            loc: {
                              start: {
                                line: 6,
                                column: 18,
                                index: 152,
                              },
                              end: {
                                line: 6,
                                column: 20,
                                index: 154,
                              },
                            },
                            body: [],
                            directives: [],
                          },
                        },
                        {
                          type: 'ArrayExpression',
                          start: 155,
                          end: 157,
                          loc: {
                            start: {
                              line: 6,
                              column: 21,
                              index: 155,
                            },
                            end: {
                              line: 6,
                              column: 23,
                              index: 157,
                            },
                          },
                          elements: [],
                        },
                      ],
                    },
                  },
                  {
                    type: 'ReturnStatement',
                    start: 160,
                    end: 499,
                    loc: {
                      start: {
                        line: 7,
                        column: 1,
                        index: 160,
                      },
                      end: {
                        line: 18,
                        column: 5,
                        index: 499,
                      },
                    },
                    argument: {
                      type: 'JSXFragment',
                      start: 175,
                      end: 493,
                      loc: {
                        start: {
                          line: 8,
                          column: 6,
                          index: 175,
                        },
                        end: {
                          line: 17,
                          column: 9,
                          index: 493,
                        },
                      },
                      openingFragment: {
                        type: 'JSXOpeningFragment',
                        start: 175,
                        end: 177,
                        loc: {
                          start: {
                            line: 8,
                            column: 6,
                            index: 175,
                          },
                          end: {
                            line: 8,
                            column: 8,
                            index: 177,
                          },
                        },
                      },
                      closingFragment: {
                        type: 'JSXClosingFragment',
                        start: 490,
                        end: 493,
                        loc: {
                          start: {
                            line: 17,
                            column: 6,
                            index: 490,
                          },
                          end: {
                            line: 17,
                            column: 9,
                            index: 493,
                          },
                        },
                      },
                      children: [
                        {
                          type: 'JSXText',
                          start: 177,
                          end: 185,
                          loc: {
                            start: {
                              line: 8,
                              column: 8,
                              index: 177,
                            },
                            end: {
                              line: 9,
                              column: 7,
                              index: 185,
                            },
                          },
                          extra: {
                            rawValue: '\n       ',
                            raw: '\n       ',
                          },
                          value: '\n       ',
                        },
                        {
                          type: 'JSXElement',
                          start: 185,
                          end: 244,
                          loc: {
                            start: {
                              line: 9,
                              column: 7,
                              index: 185,
                            },
                            end: {
                              line: 9,
                              column: 66,
                              index: 244,
                            },
                          },
                          openingElement: {
                            type: 'JSXOpeningElement',
                            start: 185,
                            end: 222,
                            loc: {
                              start: {
                                line: 9,
                                column: 7,
                                index: 185,
                              },
                              end: {
                                line: 9,
                                column: 44,
                                index: 222,
                              },
                            },
                            name: {
                              type: 'JSXIdentifier',
                              start: 186,
                              end: 189,
                              loc: {
                                start: {
                                  line: 9,
                                  column: 8,
                                  index: 186,
                                },
                                end: {
                                  line: 9,
                                  column: 11,
                                  index: 189,
                                },
                              },
                              name: 'div',
                            },
                            attributes: [
                              {
                                type: 'JSXAttribute',
                                start: 190,
                                end: 205,
                                loc: {
                                  start: {
                                    line: 9,
                                    column: 12,
                                    index: 190,
                                  },
                                  end: {
                                    line: 9,
                                    column: 27,
                                    index: 205,
                                  },
                                },
                                name: {
                                  type: 'JSXIdentifier',
                                  start: 190,
                                  end: 199,
                                  loc: {
                                    start: {
                                      line: 9,
                                      column: 12,
                                      index: 190,
                                    },
                                    end: {
                                      line: 9,
                                      column: 21,
                                      index: 199,
                                    },
                                  },
                                  name: 'className',
                                },
                                value: {
                                  type: 'StringLiteral',
                                  start: 200,
                                  end: 205,
                                  loc: {
                                    start: {
                                      line: 9,
                                      column: 22,
                                      index: 200,
                                    },
                                    end: {
                                      line: 9,
                                      column: 27,
                                      index: 205,
                                    },
                                  },
                                  extra: {
                                    rawValue: 'app',
                                    raw: '"app"',
                                  },
                                  value: 'app',
                                },
                              },
                              {
                                type: 'JSXAttribute',
                                start: 206,
                                end: 221,
                                loc: {
                                  start: {
                                    line: 9,
                                    column: 28,
                                    index: 206,
                                  },
                                  end: {
                                    line: 9,
                                    column: 43,
                                    index: 221,
                                  },
                                },
                                name: {
                                  type: 'JSXIdentifier',
                                  start: 206,
                                  end: 213,
                                  loc: {
                                    start: {
                                      line: 9,
                                      column: 28,
                                      index: 206,
                                    },
                                    end: {
                                      line: 9,
                                      column: 35,
                                      index: 213,
                                    },
                                  },
                                  name: 'onClick',
                                },
                                value: {
                                  type: 'JSXExpressionContainer',
                                  start: 214,
                                  end: 221,
                                  loc: {
                                    start: {
                                      line: 9,
                                      column: 36,
                                      index: 214,
                                    },
                                    end: {
                                      line: 9,
                                      column: 43,
                                      index: 221,
                                    },
                                  },
                                  expression: {
                                    type: 'Identifier',
                                    start: 215,
                                    end: 220,
                                    loc: {
                                      start: {
                                        line: 9,
                                        column: 37,
                                        index: 215,
                                      },
                                      end: {
                                        line: 9,
                                        column: 42,
                                        index: 220,
                                      },
                                      identifierName: 'click',
                                    },
                                    name: 'click',
                                  },
                                },
                              },
                            ],
                            selfClosing: false,
                          },
                          closingElement: {
                            type: 'JSXClosingElement',
                            start: 238,
                            end: 244,
                            loc: {
                              start: {
                                line: 9,
                                column: 60,
                                index: 238,
                              },
                              end: {
                                line: 9,
                                column: 66,
                                index: 244,
                              },
                            },
                            name: {
                              type: 'JSXIdentifier',
                              start: 240,
                              end: 243,
                              loc: {
                                start: {
                                  line: 9,
                                  column: 62,
                                  index: 240,
                                },
                                end: {
                                  line: 9,
                                  column: 65,
                                  index: 243,
                                },
                              },
                              name: 'div',
                            },
                          },
                          children: [
                            {
                              type: 'JSXText',
                              start: 222,
                              end: 238,
                              loc: {
                                start: {
                                  line: 9,
                                  column: 44,
                                  index: 222,
                                },
                                end: {
                                  line: 9,
                                  column: 60,
                                  index: 238,
                                },
                              },
                              extra: {
                                rawValue: 'this is test jsx',
                                raw: 'this is test jsx',
                              },
                              value: 'this is test jsx',
                            },
                          ],
                        },
                        {
                          type: 'JSXText',
                          start: 244,
                          end: 249,
                          loc: {
                            start: {
                              line: 9,
                              column: 66,
                              index: 244,
                            },
                            end: {
                              line: 10,
                              column: 4,
                              index: 249,
                            },
                          },
                          extra: {
                            rawValue: '\n\t   ',
                            raw: '\n\t   ',
                          },
                          value: '\n\t   ',
                        },
                        {
                          type: 'JSXElement',
                          start: 249,
                          end: 332,
                          loc: {
                            start: {
                              line: 10,
                              column: 4,
                              index: 249,
                            },
                            end: {
                              line: 12,
                              column: 13,
                              index: 332,
                            },
                          },
                          openingElement: {
                            type: 'JSXOpeningElement',
                            start: 249,
                            end: 290,
                            loc: {
                              start: {
                                line: 10,
                                column: 4,
                                index: 249,
                              },
                              end: {
                                line: 10,
                                column: 45,
                                index: 290,
                              },
                            },
                            name: {
                              type: 'JSXIdentifier',
                              start: 250,
                              end: 253,
                              loc: {
                                start: {
                                  line: 10,
                                  column: 5,
                                  index: 250,
                                },
                                end: {
                                  line: 10,
                                  column: 8,
                                  index: 253,
                                },
                              },
                              name: 'div',
                            },
                            attributes: [
                              {
                                type: 'JSXAttribute',
                                start: 254,
                                end: 273,
                                loc: {
                                  start: {
                                    line: 10,
                                    column: 9,
                                    index: 254,
                                  },
                                  end: {
                                    line: 10,
                                    column: 28,
                                    index: 273,
                                  },
                                },
                                name: {
                                  type: 'JSXIdentifier',
                                  start: 254,
                                  end: 263,
                                  loc: {
                                    start: {
                                      line: 10,
                                      column: 9,
                                      index: 254,
                                    },
                                    end: {
                                      line: 10,
                                      column: 18,
                                      index: 263,
                                    },
                                  },
                                  name: 'className',
                                },
                                value: {
                                  type: 'StringLiteral',
                                  start: 264,
                                  end: 273,
                                  loc: {
                                    start: {
                                      line: 10,
                                      column: 19,
                                      index: 264,
                                    },
                                    end: {
                                      line: 10,
                                      column: 28,
                                      index: 273,
                                    },
                                  },
                                  extra: {
                                    rawValue: 'contain',
                                    raw: '"contain"',
                                  },
                                  value: 'contain',
                                },
                              },
                              {
                                type: 'JSXAttribute',
                                start: 274,
                                end: 289,
                                loc: {
                                  start: {
                                    line: 10,
                                    column: 29,
                                    index: 274,
                                  },
                                  end: {
                                    line: 10,
                                    column: 44,
                                    index: 289,
                                  },
                                },
                                name: {
                                  type: 'JSXIdentifier',
                                  start: 274,
                                  end: 281,
                                  loc: {
                                    start: {
                                      line: 10,
                                      column: 29,
                                      index: 274,
                                    },
                                    end: {
                                      line: 10,
                                      column: 36,
                                      index: 281,
                                    },
                                  },
                                  name: 'onClick',
                                },
                                value: {
                                  type: 'JSXExpressionContainer',
                                  start: 282,
                                  end: 289,
                                  loc: {
                                    start: {
                                      line: 10,
                                      column: 37,
                                      index: 282,
                                    },
                                    end: {
                                      line: 10,
                                      column: 44,
                                      index: 289,
                                    },
                                  },
                                  expression: {
                                    type: 'Identifier',
                                    start: 283,
                                    end: 288,
                                    loc: {
                                      start: {
                                        line: 10,
                                        column: 38,
                                        index: 283,
                                      },
                                      end: {
                                        line: 10,
                                        column: 43,
                                        index: 288,
                                      },
                                      identifierName: 'click',
                                    },
                                    name: 'click',
                                  },
                                },
                              },
                            ],
                            selfClosing: false,
                          },
                          closingElement: {
                            type: 'JSXClosingElement',
                            start: 326,
                            end: 332,
                            loc: {
                              start: {
                                line: 12,
                                column: 7,
                                index: 326,
                              },
                              end: {
                                line: 12,
                                column: 13,
                                index: 332,
                              },
                            },
                            name: {
                              type: 'JSXIdentifier',
                              start: 328,
                              end: 331,
                              loc: {
                                start: {
                                  line: 12,
                                  column: 9,
                                  index: 328,
                                },
                                end: {
                                  line: 12,
                                  column: 12,
                                  index: 331,
                                },
                              },
                              name: 'div',
                            },
                          },
                          children: [
                            {
                              type: 'JSXText',
                              start: 290,
                              end: 300,
                              loc: {
                                start: {
                                  line: 10,
                                  column: 45,
                                  index: 290,
                                },
                                end: {
                                  line: 11,
                                  column: 9,
                                  index: 300,
                                },
                              },
                              extra: {
                                rawValue: '\n         ',
                                raw: '\n         ',
                              },
                              value: '\n         ',
                            },
                            {
                              type: 'JSXElement',
                              start: 300,
                              end: 318,
                              loc: {
                                start: {
                                  line: 11,
                                  column: 9,
                                  index: 300,
                                },
                                end: {
                                  line: 11,
                                  column: 27,
                                  index: 318,
                                },
                              },
                              openingElement: {
                                type: 'JSXOpeningElement',
                                start: 300,
                                end: 306,
                                loc: {
                                  start: {
                                    line: 11,
                                    column: 9,
                                    index: 300,
                                  },
                                  end: {
                                    line: 11,
                                    column: 15,
                                    index: 306,
                                  },
                                },
                                name: {
                                  type: 'JSXIdentifier',
                                  start: 301,
                                  end: 305,
                                  loc: {
                                    start: {
                                      line: 11,
                                      column: 10,
                                      index: 301,
                                    },
                                    end: {
                                      line: 11,
                                      column: 14,
                                      index: 305,
                                    },
                                  },
                                  name: 'span',
                                },
                                attributes: [],
                                selfClosing: false,
                              },
                              closingElement: {
                                type: 'JSXClosingElement',
                                start: 311,
                                end: 318,
                                loc: {
                                  start: {
                                    line: 11,
                                    column: 20,
                                    index: 311,
                                  },
                                  end: {
                                    line: 11,
                                    column: 27,
                                    index: 318,
                                  },
                                },
                                name: {
                                  type: 'JSXIdentifier',
                                  start: 313,
                                  end: 317,
                                  loc: {
                                    start: {
                                      line: 11,
                                      column: 22,
                                      index: 313,
                                    },
                                    end: {
                                      line: 11,
                                      column: 26,
                                      index: 317,
                                    },
                                  },
                                  name: 'span',
                                },
                              },
                              children: [
                                {
                                  type: 'JSXText',
                                  start: 306,
                                  end: 311,
                                  loc: {
                                    start: {
                                      line: 11,
                                      column: 15,
                                      index: 306,
                                    },
                                    end: {
                                      line: 11,
                                      column: 20,
                                      index: 311,
                                    },
                                  },
                                  extra: {
                                    rawValue: 'child',
                                    raw: 'child',
                                  },
                                  value: 'child',
                                },
                              ],
                            },
                            {
                              type: 'JSXText',
                              start: 318,
                              end: 326,
                              loc: {
                                start: {
                                  line: 11,
                                  column: 27,
                                  index: 318,
                                },
                                end: {
                                  line: 12,
                                  column: 7,
                                  index: 326,
                                },
                              },
                              extra: {
                                rawValue: '\n       ',
                                raw: '\n       ',
                              },
                              value: '\n       ',
                            },
                          ],
                        },
                        {
                          type: 'JSXText',
                          start: 332,
                          end: 335,
                          loc: {
                            start: {
                              line: 12,
                              column: 13,
                              index: 332,
                            },
                            end: {
                              line: 13,
                              column: 2,
                              index: 335,
                            },
                          },
                          extra: {
                            rawValue: '\n\t\t',
                            raw: '\n\t\t',
                          },
                          value: '\n\t\t',
                        },
                        {
                          type: 'JSXExpressionContainer',
                          start: 335,
                          end: 393,
                          loc: {
                            start: {
                              line: 13,
                              column: 2,
                              index: 335,
                            },
                            end: {
                              line: 13,
                              column: 60,
                              index: 393,
                            },
                          },
                          expression: {
                            type: 'ConditionalExpression',
                            start: 336,
                            end: 392,
                            loc: {
                              start: {
                                line: 13,
                                column: 3,
                                index: 336,
                              },
                              end: {
                                line: 13,
                                column: 59,
                                index: 392,
                              },
                            },
                            test: {
                              type: 'MemberExpression',
                              start: 336,
                              end: 348,
                              loc: {
                                start: {
                                  line: 13,
                                  column: 3,
                                  index: 336,
                                },
                                end: {
                                  line: 13,
                                  column: 15,
                                  index: 348,
                                },
                              },
                              object: {
                                type: 'Identifier',
                                start: 336,
                                end: 341,
                                loc: {
                                  start: {
                                    line: 13,
                                    column: 3,
                                    index: 336,
                                  },
                                  end: {
                                    line: 13,
                                    column: 8,
                                    index: 341,
                                  },
                                  identifierName: 'state',
                                },
                                name: 'state',
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                start: 342,
                                end: 348,
                                loc: {
                                  start: {
                                    line: 13,
                                    column: 9,
                                    index: 342,
                                  },
                                  end: {
                                    line: 13,
                                    column: 15,
                                    index: 348,
                                  },
                                  identifierName: 'length',
                                },
                                name: 'length',
                              },
                            },
                            consequent: {
                              type: 'JSXElement',
                              start: 351,
                              end: 370,
                              loc: {
                                start: {
                                  line: 13,
                                  column: 18,
                                  index: 351,
                                },
                                end: {
                                  line: 13,
                                  column: 37,
                                  index: 370,
                                },
                              },
                              openingElement: {
                                type: 'JSXOpeningElement',
                                start: 351,
                                end: 355,
                                loc: {
                                  start: {
                                    line: 13,
                                    column: 18,
                                    index: 351,
                                  },
                                  end: {
                                    line: 13,
                                    column: 22,
                                    index: 355,
                                  },
                                },
                                name: {
                                  type: 'JSXIdentifier',
                                  start: 352,
                                  end: 354,
                                  loc: {
                                    start: {
                                      line: 13,
                                      column: 19,
                                      index: 352,
                                    },
                                    end: {
                                      line: 13,
                                      column: 21,
                                      index: 354,
                                    },
                                  },
                                  name: 'h1',
                                },
                                attributes: [],
                                selfClosing: false,
                              },
                              closingElement: {
                                type: 'JSXClosingElement',
                                start: 365,
                                end: 370,
                                loc: {
                                  start: {
                                    line: 13,
                                    column: 32,
                                    index: 365,
                                  },
                                  end: {
                                    line: 13,
                                    column: 37,
                                    index: 370,
                                  },
                                },
                                name: {
                                  type: 'JSXIdentifier',
                                  start: 367,
                                  end: 369,
                                  loc: {
                                    start: {
                                      line: 13,
                                      column: 34,
                                      index: 367,
                                    },
                                    end: {
                                      line: 13,
                                      column: 36,
                                      index: 369,
                                    },
                                  },
                                  name: 'h1',
                                },
                              },
                              children: [
                                {
                                  type: 'JSXText',
                                  start: 355,
                                  end: 365,
                                  loc: {
                                    start: {
                                      line: 13,
                                      column: 22,
                                      index: 355,
                                    },
                                    end: {
                                      line: 13,
                                      column: 32,
                                      index: 365,
                                    },
                                  },
                                  extra: {
                                    rawValue: 'this is h1',
                                    raw: 'this is h1',
                                  },
                                  value: 'this is h1',
                                },
                              ],
                            },
                            alternate: {
                              type: 'JSXElement',
                              start: 373,
                              end: 392,
                              loc: {
                                start: {
                                  line: 13,
                                  column: 40,
                                  index: 373,
                                },
                                end: {
                                  line: 13,
                                  column: 59,
                                  index: 392,
                                },
                              },
                              openingElement: {
                                type: 'JSXOpeningElement',
                                start: 373,
                                end: 377,
                                loc: {
                                  start: {
                                    line: 13,
                                    column: 40,
                                    index: 373,
                                  },
                                  end: {
                                    line: 13,
                                    column: 44,
                                    index: 377,
                                  },
                                },
                                name: {
                                  type: 'JSXIdentifier',
                                  start: 374,
                                  end: 376,
                                  loc: {
                                    start: {
                                      line: 13,
                                      column: 41,
                                      index: 374,
                                    },
                                    end: {
                                      line: 13,
                                      column: 43,
                                      index: 376,
                                    },
                                  },
                                  name: 'h2',
                                },
                                attributes: [],
                                selfClosing: false,
                              },
                              closingElement: {
                                type: 'JSXClosingElement',
                                start: 387,
                                end: 392,
                                loc: {
                                  start: {
                                    line: 13,
                                    column: 54,
                                    index: 387,
                                  },
                                  end: {
                                    line: 13,
                                    column: 59,
                                    index: 392,
                                  },
                                },
                                name: {
                                  type: 'JSXIdentifier',
                                  start: 389,
                                  end: 391,
                                  loc: {
                                    start: {
                                      line: 13,
                                      column: 56,
                                      index: 389,
                                    },
                                    end: {
                                      line: 13,
                                      column: 58,
                                      index: 391,
                                    },
                                  },
                                  name: 'h2',
                                },
                              },
                              children: [
                                {
                                  type: 'JSXText',
                                  start: 377,
                                  end: 387,
                                  loc: {
                                    start: {
                                      line: 13,
                                      column: 44,
                                      index: 377,
                                    },
                                    end: {
                                      line: 13,
                                      column: 54,
                                      index: 387,
                                    },
                                  },
                                  extra: {
                                    rawValue: 'this is h2',
                                    raw: 'this is h2',
                                  },
                                  value: 'this is h2',
                                },
                              ],
                            },
                          },
                        },
                        {
                          type: 'JSXText',
                          start: 393,
                          end: 402,
                          loc: {
                            start: {
                              line: 13,
                              column: 60,
                              index: 393,
                            },
                            end: {
                              line: 14,
                              column: 8,
                              index: 402,
                            },
                          },
                          extra: {
                            rawValue: '\n        ',
                            raw: '\n        ',
                          },
                          value: '\n        ',
                        },
                        {
                          type: 'JSXExpressionContainer',
                          start: 402,
                          end: 483,
                          loc: {
                            start: {
                              line: 14,
                              column: 8,
                              index: 402,
                            },
                            end: {
                              line: 16,
                              column: 11,
                              index: 483,
                            },
                          },
                          expression: {
                            type: 'CallExpression',
                            start: 403,
                            end: 482,
                            loc: {
                              start: {
                                line: 14,
                                column: 9,
                                index: 403,
                              },
                              end: {
                                line: 16,
                                column: 10,
                                index: 482,
                              },
                            },
                            callee: {
                              type: 'MemberExpression',
                              start: 403,
                              end: 412,
                              loc: {
                                start: {
                                  line: 14,
                                  column: 9,
                                  index: 403,
                                },
                                end: {
                                  line: 14,
                                  column: 18,
                                  index: 412,
                                },
                              },
                              object: {
                                type: 'Identifier',
                                start: 403,
                                end: 408,
                                loc: {
                                  start: {
                                    line: 14,
                                    column: 9,
                                    index: 403,
                                  },
                                  end: {
                                    line: 14,
                                    column: 14,
                                    index: 408,
                                  },
                                  identifierName: 'state',
                                },
                                name: 'state',
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                start: 409,
                                end: 412,
                                loc: {
                                  start: {
                                    line: 14,
                                    column: 15,
                                    index: 409,
                                  },
                                  end: {
                                    line: 14,
                                    column: 18,
                                    index: 412,
                                  },
                                  identifierName: 'map',
                                },
                                name: 'map',
                              },
                            },
                            arguments: [
                              {
                                type: 'ArrowFunctionExpression',
                                start: 413,
                                end: 481,
                                loc: {
                                  start: {
                                    line: 14,
                                    column: 19,
                                    index: 413,
                                  },
                                  end: {
                                    line: 16,
                                    column: 9,
                                    index: 481,
                                  },
                                },
                                id: null,
                                generator: false,
                                async: false,
                                params: [
                                  {
                                    type: 'Identifier',
                                    start: 413,
                                    end: 417,
                                    loc: {
                                      start: {
                                        line: 14,
                                        column: 19,
                                        index: 413,
                                      },
                                      end: {
                                        line: 14,
                                        column: 23,
                                        index: 417,
                                      },
                                      identifierName: 'item',
                                    },
                                    name: 'item',
                                  },
                                ],
                                body: {
                                  type: 'BlockStatement',
                                  start: 419,
                                  end: 481,
                                  loc: {
                                    start: {
                                      line: 14,
                                      column: 25,
                                      index: 419,
                                    },
                                    end: {
                                      line: 16,
                                      column: 9,
                                      index: 481,
                                    },
                                  },
                                  body: [
                                    {
                                      type: 'ReturnStatement',
                                      start: 430,
                                      end: 471,
                                      loc: {
                                        start: {
                                          line: 15,
                                          column: 9,
                                          index: 430,
                                        },
                                        end: {
                                          line: 15,
                                          column: 50,
                                          index: 471,
                                        },
                                      },
                                      argument: {
                                        type: 'JSXElement',
                                        start: 437,
                                        end: 471,
                                        loc: {
                                          start: {
                                            line: 15,
                                            column: 16,
                                            index: 437,
                                          },
                                          end: {
                                            line: 15,
                                            column: 50,
                                            index: 471,
                                          },
                                        },
                                        openingElement: {
                                          type: 'JSXOpeningElement',
                                          start: 437,
                                          end: 455,
                                          loc: {
                                            start: {
                                              line: 15,
                                              column: 16,
                                              index: 437,
                                            },
                                            end: {
                                              line: 15,
                                              column: 34,
                                              index: 455,
                                            },
                                          },
                                          name: {
                                            type: 'JSXIdentifier',
                                            start: 438,
                                            end: 439,
                                            loc: {
                                              start: {
                                                line: 15,
                                                column: 17,
                                                index: 438,
                                              },
                                              end: {
                                                line: 15,
                                                column: 18,
                                                index: 439,
                                              },
                                            },
                                            name: 'p',
                                          },
                                          attributes: [
                                            {
                                              type: 'JSXAttribute',
                                              start: 440,
                                              end: 454,
                                              loc: {
                                                start: {
                                                  line: 15,
                                                  column: 19,
                                                  index: 440,
                                                },
                                                end: {
                                                  line: 15,
                                                  column: 33,
                                                  index: 454,
                                                },
                                              },
                                              name: {
                                                type: 'JSXIdentifier',
                                                start: 440,
                                                end: 443,
                                                loc: {
                                                  start: {
                                                    line: 15,
                                                    column: 19,
                                                    index: 440,
                                                  },
                                                  end: {
                                                    line: 15,
                                                    column: 22,
                                                    index: 443,
                                                  },
                                                },
                                                name: 'key',
                                              },
                                              value: {
                                                type: 'JSXExpressionContainer',
                                                start: 444,
                                                end: 454,
                                                loc: {
                                                  start: {
                                                    line: 15,
                                                    column: 23,
                                                    index: 444,
                                                  },
                                                  end: {
                                                    line: 15,
                                                    column: 33,
                                                    index: 454,
                                                  },
                                                },
                                                expression: {
                                                  type: 'MemberExpression',
                                                  start: 445,
                                                  end: 453,
                                                  loc: {
                                                    start: {
                                                      line: 15,
                                                      column: 24,
                                                      index: 445,
                                                    },
                                                    end: {
                                                      line: 15,
                                                      column: 32,
                                                      index: 453,
                                                    },
                                                  },
                                                  object: {
                                                    type: 'Identifier',
                                                    start: 445,
                                                    end: 449,
                                                    loc: {
                                                      start: {
                                                        line: 15,
                                                        column: 24,
                                                        index: 445,
                                                      },
                                                      end: {
                                                        line: 15,
                                                        column: 28,
                                                        index: 449,
                                                      },
                                                      identifierName: 'item',
                                                    },
                                                    name: 'item',
                                                  },
                                                  computed: false,
                                                  property: {
                                                    type: 'Identifier',
                                                    start: 450,
                                                    end: 453,
                                                    loc: {
                                                      start: {
                                                        line: 15,
                                                        column: 29,
                                                        index: 450,
                                                      },
                                                      end: {
                                                        line: 15,
                                                        column: 32,
                                                        index: 453,
                                                      },
                                                      identifierName: 'key',
                                                    },
                                                    name: 'key',
                                                  },
                                                },
                                              },
                                            },
                                          ],
                                          selfClosing: false,
                                        },
                                        closingElement: {
                                          type: 'JSXClosingElement',
                                          start: 467,
                                          end: 471,
                                          loc: {
                                            start: {
                                              line: 15,
                                              column: 46,
                                              index: 467,
                                            },
                                            end: {
                                              line: 15,
                                              column: 50,
                                              index: 471,
                                            },
                                          },
                                          name: {
                                            type: 'JSXIdentifier',
                                            start: 469,
                                            end: 470,
                                            loc: {
                                              start: {
                                                line: 15,
                                                column: 48,
                                                index: 469,
                                              },
                                              end: {
                                                line: 15,
                                                column: 49,
                                                index: 470,
                                              },
                                            },
                                            name: 'p',
                                          },
                                        },
                                        children: [
                                          {
                                            type: 'JSXExpressionContainer',
                                            start: 455,
                                            end: 467,
                                            loc: {
                                              start: {
                                                line: 15,
                                                column: 34,
                                                index: 455,
                                              },
                                              end: {
                                                line: 15,
                                                column: 46,
                                                index: 467,
                                              },
                                            },
                                            expression: {
                                              type: 'MemberExpression',
                                              start: 456,
                                              end: 466,
                                              loc: {
                                                start: {
                                                  line: 15,
                                                  column: 35,
                                                  index: 456,
                                                },
                                                end: {
                                                  line: 15,
                                                  column: 45,
                                                  index: 466,
                                                },
                                              },
                                              object: {
                                                type: 'Identifier',
                                                start: 456,
                                                end: 460,
                                                loc: {
                                                  start: {
                                                    line: 15,
                                                    column: 35,
                                                    index: 456,
                                                  },
                                                  end: {
                                                    line: 15,
                                                    column: 39,
                                                    index: 460,
                                                  },
                                                  identifierName: 'item',
                                                },
                                                name: 'item',
                                              },
                                              computed: false,
                                              property: {
                                                type: 'Identifier',
                                                start: 461,
                                                end: 466,
                                                loc: {
                                                  start: {
                                                    line: 15,
                                                    column: 40,
                                                    index: 461,
                                                  },
                                                  end: {
                                                    line: 15,
                                                    column: 45,
                                                    index: 466,
                                                  },
                                                  identifierName: 'value',
                                                },
                                                name: 'value',
                                              },
                                            },
                                          },
                                        ],
                                      },
                                    },
                                  ],
                                  directives: [],
                                },
                              },
                            ],
                          },
                        },
                        {
                          type: 'JSXText',
                          start: 483,
                          end: 490,
                          loc: {
                            start: {
                              line: 16,
                              column: 11,
                              index: 483,
                            },
                            end: {
                              line: 17,
                              column: 6,
                              index: 490,
                            },
                          },
                          extra: {
                            rawValue: '\n      ',
                            raw: '\n      ',
                          },
                          value: '\n      ',
                        },
                      ],
                      extra: {
                        parenthesized: true,
                        parenStart: 167,
                      },
                    },
                  },
                ],
                directives: [],
              },
            },
          },
        ],
        kind: 'const',
      },
    ],
    directives: [],
  },
  comments: [],
}
