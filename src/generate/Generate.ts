import type {
  ArrayExpression,
  ArrayPattern,
  ArrowFunctionExpression,
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  CallExpression,
  ExportAllDeclaration,
  ExportDefaultDeclaration,
  ExportNamedDeclaration,
  ExportSpecifier,
  Expression,
  ExpressionStatement,
  ForInStatement,
  ForOfStatement,
  ForStatement,
  FunctionDeclaration,
  FunctionExpression,
  Identifier,
  IfStatement,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  LabeledStatement,
  MemberExpression,
  ObjectExpression,
  ObjectPattern,
  Program,
  ReturnStatement,
  Statement,
  SwitchStatement,
  UpdateExpression,
  VariableDeclaration,
  VariableDeclarator,
} from '@/ast/NodeType';
import { NodeType, NodeTypeStatements } from '@/ast/NodeType';
import { RanString } from '@/utils/betterString';

type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);

type StatementFunction<T extends Statement = Statement> = IsEqual<
  T,
  Statement
> extends true
  ? T extends T
    ? (node: T) => void
    : never
  : (node: T) => void;

type GenerateStatement = StatementFunction<Statement>;

export class Generate {
  ast: Program;
  code: RanString;
  currentLine: number;
  currentIndex: number;
  constructor(ast: Program) {
    const { loc } = ast;
    this.ast = ast;
    this.currentLine = loc?.start?.line || 1;
    this.currentIndex = loc?.start?.index || ast.start;
    const end = loc?.end?.index || ast.end;
    const start = loc?.start?.index || ast.start;
    this.code = new RanString(end - start);
  }
  generateExportDefaultDeclaration(node: ExportDefaultDeclaration): void {
    const { loc, declaration } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + 15, `export default `);
    this.currentIndex = loc.start.index + 15;
    if (declaration.type === NodeType.FunctionDeclaration) {
      this.generateFunctionDeclaration(declaration);
    }
  }
  generateExportAllDeclaration(node: ExportAllDeclaration): void {
    const { loc, exported, source } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(
      loc.start.index,
      loc.end.index,
      `export * from ${source.raw};`,
    );
    this.currentIndex = loc.end.index;
  }
  generateExportSpecifier(node: ExportSpecifier): void {
    const { loc, exported, local } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (exported.name === local.name) {
      this.code.update(loc.start.index, loc.end.index, local.name);
    } else {
      this.code.update(
        loc.start.index,
        loc.end.index,
        `${local.name} as ${exported.name}`,
      );
    }
    this.currentIndex = loc.end.index;
  }
  generateExportNamedDeclaration(node: ExportNamedDeclaration): void {
    const { loc, specifiers = [], source } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + 7, 'export ');
    this.currentIndex = loc.start.index + 7;
    const size = specifiers.length - 1;
    let flag = true;
    specifiers.forEach((specifier, index) => {
      const { type, loc } = specifier;
      if (type === NodeType.ExportSpecifier) {
        this.generateExportSpecifier(specifier);
        if (flag) {
          flag = false;
          this.code.update(loc.start.index - 2, loc.start.index, '{ ');
          this.currentIndex = loc.start.index;
        }
      }
      if (index < size) {
        this.code.update(loc.end.index, loc.end.index + 1, ',');
        this.currentIndex = loc.end.index + 1;
      }
    });
    if (!flag) {
      flag = true;
      this.code.update(
        specifiers[size].loc.end.index,
        specifiers[size].loc.end.index + 2,
        ' }',
      );
      this.currentIndex = specifiers[size].loc.end.index + 2;
    }
    if (source) {
      this.code.update(
        source.loc.start.index - 5,
        source.loc.end.index,
        `from ${source.raw};`,
      );
      this.currentIndex = source.loc.end.index;
    }
  }
  generateImportDefaultSpecifier(node: ImportDefaultSpecifier): void {
    const { loc, local } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (local.type === NodeType.Identifier) {
      this.generateIdentifier(local);
    }
  }
  generateImportSpecifier(node: ImportSpecifier): void {
    const { loc, imported, local } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (imported.name === local.name) {
      this.code.update(loc.start.index, loc.end.index, local.name);
    } else {
      this.code.update(
        loc.start.index,
        loc.end.index,
        `${imported.name} as ${local.name}`,
      );
    }
    this.currentIndex = loc.end.index;
  }
  generateImportNamespaceSpecifier(node: ImportNamespaceSpecifier): void {
    const { loc, local } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.end.index, `* as ${local.name}`);
    this.currentIndex = loc.end.index;
  }
  generateImportDeclaration(node: ImportDeclaration): void {
    const { specifiers = [], source, loc } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + 7, 'import ');
    this.currentIndex = loc.start.index + 7;
    const size = specifiers.length - 1;
    // 1. flag true indicates the beginning of the open parenthesis
    // and false indicates the end of the close parenthesis
    let flag = true;
    specifiers.forEach((specifier, index) => {
      const { type, loc } = specifier;
      if (type === NodeType.ImportDefaultSpecifier) {
        this.generateImportDefaultSpecifier(specifier);
        // 2. ImportDefaultSpecifier does not require parentheses
        // 3. Close the parenthesis if ImportDefaultSpecifier is encountered
        if (!flag) {
          flag = true;
          this.code.update(loc.end.index - 2, loc.end.index, ' }');
          this.currentIndex = loc.end.index;
        }
      }
      // 4. ImportSpecifier need parenthesis
      // 5. The first ImportSpecifier adds an open bracket
      if (type === NodeType.ImportSpecifier) {
        this.generateImportSpecifier(specifier);
        if (flag) {
          flag = false;
          this.code.update(loc.start.index - 2, loc.start.index, '{ ');
          this.currentIndex = loc.start.index;
        }
      }
      if (type === NodeType.ImportNamespaceSpecifier) {
        this.generateImportNamespaceSpecifier(specifier);
      }
      if (index < size) {
        this.code.update(loc.end.index, loc.end.index + 1, ',');
        this.currentIndex = loc.end.index + 1;
      }
    });
    // 6. if the specifiers are consumed and flag is false, add an open parenthesis
    if (!flag) {
      flag = true;
      this.code.update(
        specifiers[size].loc.end.index,
        specifiers[size].loc.end.index + 2,
        ' }',
      );
      this.currentIndex = specifiers[size].loc.end.index + 2;
    }
    if (source) {
      if (size < 0) {
        this.code.update(
          source.loc.start.index,
          source.loc.end.index,
          `${source.raw};`,
        );
      } else {
        this.code.update(
          source.loc.start.index - 5,
          source.loc.end.index,
          `from ${source.raw};`,
        );
      }
      this.currentIndex = source.loc.end.index + 1;
    }
  }
  generateCallExpression(node: CallExpression): void {
    const { loc } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (node.callee.type === NodeType.MemberExpression) {
      this.generateMemberExpression(node.callee);
    } else if (node.callee.type === NodeType.Identifier) {
      this.generateIdentifier(node.callee);
    } else if (node.callee.type === NodeType.CallExpression) {
      this.generateCallExpression(node.callee);
    } else if (node.callee.type === NodeType.FunctionExpression) {
      this.code.update(loc.start.index - 1, loc.start.index, '(');
      this.currentIndex = loc.start.index;
      this.generateFunctionExpression(node.callee);
      this.code.update(
        node.callee.loc.end.index - 1,
        node.callee.loc.end.index,
        ')',
      );
      this.currentIndex = node.callee.loc.end.index;
    }
    if (node.arguments?.length > 0) {
      this.generateFunctionParams(node.arguments);
    } else {
      this.code.update(
        node.callee.loc.end.index,
        node.callee.loc.end.index + 2,
        '()',
      );
      this.currentIndex = node.callee.loc.end.index + 2;
    }
  }
  generateReturnStatement(node: ReturnStatement): void {
    const { loc, argument } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (argument?.type === NodeType.CallExpression) {
      this.code.update(loc.start.index, loc.start.index + 7, 'return ');
      this.currentIndex = loc.start.index + 7;
      this.generateCallExpression(argument);
    } else {
      this.code.update(loc.start.index, loc.end.index, 'return');
      this.currentIndex = loc.end.index;
    }
  }
  generateBlockStatement(node: BlockStatement): void {
    const { loc, body = [] } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (body.length > 0) {
      this.code.update(loc.start.index, loc.start.index + 1, '{');
      this.currentIndex = loc.start.index + 2;
      body.forEach((item) => {
        if (item.type === NodeType.ReturnStatement) {
          this.generateReturnStatement(item);
        }
        if (item.type === NodeType.ExpressionStatement) {
          this.generateExpressionStatement(item);
        }
        if (item.type === NodeType.VariableDeclaration) {
          this.generateVariableDeclaration(item);
        }
      });
      if (loc.end.line > this.currentLine) {
        this.currentLine = loc.end.line;
        this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
        this.currentIndex++;
      }
      this.code.update(loc.end.index - 1, loc.end.index, '}');
      this.currentIndex = loc.end.index;
    } else {
      this.code.update(loc.start.index, loc.end.index, '{}');
      this.currentIndex = loc.end.index;
    }
  }
  generateFunctionParams(params: Expression[] | Identifier[] = []): void {
    const paramsEndIndex = params.length - 1;
    const paramsStartIndex = 0;
    params.forEach((param, index) => {
      const { type } = param;
      const paramStart = params[paramsStartIndex].loc.start.index;
      const paramEnd = params[paramsEndIndex].loc.end.index;
      if (type === NodeType.ArrayExpression) {
        this.generateArrayExpression(param);
      }
      if (type === NodeType.ArrowFunctionExpression) {
        this.generateArrowFunctionExpressionExpression(param);
      }
      if (type === NodeType.Identifier) {
        this.generateIdentifier(param);
      }
      if (index === paramsStartIndex) {
        this.code.update(paramStart - 1, paramStart, '(');
        this.currentIndex = paramStart;
      }
      if (index === paramsEndIndex) {
        this.code.update(paramStart, paramEnd, ',', /\s+|;/g);
        this.code.update(paramEnd, paramEnd + 1, ')');
        this.currentIndex = paramEnd + 1;
      }
    });
  }
  generateFunctionDeclaration(node: FunctionDeclaration): void {
    const { loc, id, params = [], body, async, generator } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (async) {
      this.code.update(loc.start.index, loc.start.index + 14, 'async function');
      this.currentIndex = loc.start.index + 14;
    } else {
      this.code.update(loc.start.index, loc.start.index + 8, 'function');
      this.currentIndex = loc.start.index + 8;
    }
    if (id) {
      if (generator) {
        this.code.update(id?.loc.start.index - 1, id?.loc.start.index, '*');
        this.currentIndex = id?.loc.start.index;
      }
      this.generateIdentifier(id);
    }
    if (params.length > 0) {
      this.generateFunctionParams(params);
    } else {
      if (id) {
        this.code.update(id.loc.end.index, id.loc.end.index + 2, '()');
        this.currentIndex = id.loc.end.index + 2;
      } else {
        this.code.update(loc.start.index + 8, loc.start.index + 13, '()');
        this.currentIndex = loc.start.index + 13;
      }
    }
    if (body.type === NodeType.BlockStatement) {
      this.generateBlockStatement(body);
    }
    this.code.update(loc.end.index, loc.end.index + 1, ';');
    this.currentIndex = loc.end.index + 1;
  }
  generateIdentifier(node: Identifier): void {
    const { loc, type, name } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.end.index, name);
    this.currentIndex = loc.end.index;
  }
  generateMemberExpression(node: MemberExpression): void {
    const { type, loc, computed } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (type === NodeType.MemberExpression) {
      const { object, property } = node;
      if (object.type === NodeType.MemberExpression) {
        this.generateMemberExpression(object);
      }
      if (object.type === NodeType.Identifier) {
        this.generateIdentifier(object);
      }
      if (object.type === NodeType.CallExpression) {
        this.generateCallExpression(object);
      }
      if (property?.type === NodeType.Literal) {
        this.code.update(
          property.loc.start.index,
          property.loc.end.index,
          property.raw,
        );
        this.currentIndex = property.loc.end.index;
      }
      if (property?.type === NodeType.Identifier) {
        this.generateIdentifier(property);
      }
      if (property?.type === NodeType.CallExpression) {
        this.generateCallExpression(property);
      }
      if (property?.type === NodeType.MemberExpression) {
        this.generateMemberExpression(property);
      }
      if (computed && property) {
        this.code.update(
          property.loc.start.index - 1,
          property.loc.start.index,
          '[',
        );
        this.code.update(loc.end.index - 1, loc.end.index, ']');
      } else {
        this.code.update(loc.start.index, loc.end.index, '.', /\s/g);
      }
      this.currentIndex = loc.end.index;
    }
  }
  generateExpressionStatement(node: ExpressionStatement): void {
    const { loc, expression } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (expression.type === NodeType.MemberExpression) {
      this.generateMemberExpression(expression);
    }
    if (expression.type === NodeType.Identifier) {
      this.generateIdentifier(expression);
    }
    if (expression.type === NodeType.CallExpression) {
      this.generateCallExpression(expression);
    }
    if (expression.type === NodeType.BinaryExpression) {
      this.generateBinaryExpression(expression);
    }
    if (expression.type === NodeType.UpdateExpression) {
      this.generateUpdateExpression(expression);
    }
    if (expression.type === NodeType.AssignmentExpression) {
      this.generateAssignmentExpression(expression);
    }
    if (this.code.toString().length < loc.end.index - loc.start.index) {
      let str = ';';
      while (
        str.length + this.code.toString().length <
        loc.end.index - loc.start.index
      ) {
        str += ' ';
      }
      this.code.update(this.code.toString().length, loc.end.index, str);
      this.currentIndex = loc.end.index;
    }
  }
  generateAssignmentExpression(node: AssignmentExpression): void {
    const { left, right, operator } = node;
    if (left.type === NodeType.Identifier) {
      this.generateIdentifier(left);
    }
    this.code.addSpaceBothSlide(
      left.loc.end.index,
      right.loc.start.index - 1,
      operator,
    );
    if (right.type === NodeType.Literal) {
      this.code.update(right.loc.start.index, right.loc.end.index, right.raw);
      this.currentIndex = right.loc.end.index;
    }
    if (right.type === NodeType.Identifier) {
      this.generateIdentifier(right);
    }
    if (right.type === NodeType.AssignmentExpression) {
      this.generateAssignmentExpression(right);
    }
    if (right.type === NodeType.FunctionExpression) {
      this.generateFunctionExpression(right);
    }
  }
  generateUpdateExpression(node: UpdateExpression): void {
    const { type, operator, argument, prefix, loc } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (argument.type === NodeType.Identifier) {
      this.generateIdentifier(argument);
    }
    if (prefix) {
      this.code.update(
        loc.start.index,
        loc.start.index + operator.length,
        operator,
      );
      this.currentIndex = loc.start.index + operator.length;
    } else {
      this.code.update(
        argument.loc.end.index,
        argument.loc.end.index + operator.length,
        operator,
      );
      this.currentIndex = argument.loc.end.index + operator.length;
    }
  }
  generateBinaryExpression(node: BinaryExpression): void {
    const { type, operator, left, right, loc } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (left.type === NodeType.Identifier) {
      this.generateIdentifier(left);
    }
    if (right.type === NodeType.Identifier) {
      this.generateIdentifier(right);
    }
    if (right.type === NodeType.Literal) {
      this.code.update(right.loc.start.index, right.loc.end.index, right.raw);
      this.currentIndex = right.loc.end.index;
    }
    if (right.type === NodeType.CallExpression) {
      this.generateCallExpression(right);
    }
    const distance = right.loc.start.index - left.loc.end.index;
    let str = `${operator}`;
    while (str.length + 2 <= distance) {
      str = ' ' + str + ' ';
    }
    while (str.length < distance) {
      str = str + ' ';
    }
    this.code.update(left.loc.end.index, right.loc.start.index, str);
    this.code.update(loc.end.index, loc.end.index + 1, ';');
    this.currentIndex = loc.end.index;
  }
  generateArrayExpression(node: ArrayExpression): void {
    const { loc, elements } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + 1, '[');
    this.currentIndex = loc.start.index + 1;
    const size = elements?.length || 0;
    elements?.forEach((element, index) => {
      const { type } = element;
      if (type === NodeType.Literal) {
        this.code.update(
          element.loc.start.index,
          element.loc.end.index,
          element.raw,
        );
        this.currentIndex = element.loc.end.index;
      }
      if (type === NodeType.ArrayExpression) {
        this.generateArrayExpression(element);
      }
      if (type === NodeType.Identifier) {
        this.code.update(
          element.loc.start.index,
          element.loc.end.index,
          element.name,
        );
      }
      if (type === NodeType.ObjectExpression) {
        this.generateObjectExpression(element);
      }
      if (index + 1 < size) {
        this.code.update(element.loc.end.index, element.loc.end.index + 1, ',');
        this.currentIndex = element.loc.end.index + 1;
      }
    });
    this.code.update(node.loc.end.index - 1, node.loc.end.index, ']');
    this.currentIndex = node.loc.end.index;
  }
  generateObjectExpression(node: ObjectExpression): void {
    const { properties = [], loc } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + 1, '{');
    this.currentIndex = loc.start.index + 1;
    const size = properties.length;
    properties.forEach((property, index) => {
      const { loc, key, value } = property;
      if (key?.type === NodeType.Identifier) {
        this.code.update(key.loc.start.index, key.loc.end.index, key.name);
        this.code.update(key.loc.end.index, key.loc.end.index + 1, ':');
        this.currentIndex = key.loc.end.index + 1;
      }
      if (value?.type === NodeType.Literal) {
        this.code.update(value.loc.start.index, value.loc.end.index, value.raw);
        this.currentIndex = value.loc.end.index;
      }
      if (value?.type === NodeType.Identifier) {
        this.code.update(
          value.loc.start.index,
          value.loc.end.index,
          value.name,
        );
        this.currentIndex = value.loc.end.index;
      }
      if (value?.type === NodeType.ObjectExpression) {
        this.generateObjectExpression(value);
      }
      if (index + 1 < size) {
        this.code.update(loc.end.index, loc.end.index + 1, ',');
        this.currentIndex = loc.end.index + 1;
      }
    });
    this.code.update(loc.end.index - 1, loc.end.index, '}');
    this.currentIndex = loc.end.index;
  }
  generateArrayPattern(node: ArrayPattern) {
    const { loc, elements } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + 1, '[');
    this.currentIndex = loc.start.index + 1;
    const size = elements?.length || 0;
    elements?.forEach((element, index) => {
      const { type } = element;
      if (type === NodeType.Identifier) {
        this.code.update(
          element.loc.start.index,
          element.loc.end.index,
          element.name,
        );
        this.currentIndex = element.loc.end.index;
      }
      if (index + 1 < size) {
        this.code.update(element.loc.end.index, element.loc.end.index + 1, ',');
        this.currentIndex = element.loc.end.index + 1;
      }
    });
    this.code.update(node.loc.end.index - 1, node.loc.end.index, ']');
    this.currentIndex = node.loc.end.index;
  }
  generateObjectPattern(node: ObjectPattern) {
    const { properties = [], loc } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + 1, '{');
    this.currentIndex = loc.start.index + 1;
    const size = properties.length;
    properties.forEach((property, index) => {
      const { loc, key, value } = property;
      if (key?.type === NodeType.Identifier) {
        this.code.update(key.loc.start.index, key.loc.end.index, key.name);
        this.code.update(key.loc.end.index, key.loc.end.index + 1, ':');
        this.currentIndex = key.loc.end.index + 1;
      }
      if (value?.type === NodeType.Literal) {
        this.code.update(value.loc.start.index, value.loc.end.index, value.raw);
        this.currentIndex = value.loc.end.index;
      }
      if (value?.type === NodeType.Identifier) {
        this.code.update(
          value.loc.start.index,
          value.loc.end.index,
          value.name,
        );
        this.currentIndex = value.loc.end.index;
      }
      if (value?.type === NodeType.ObjectExpression) {
        this.generateObjectExpression(value);
      }
      if (index + 1 < size) {
        this.code.update(loc.end.index, loc.end.index + 1, ',');
        this.currentIndex = loc.end.index + 1;
      }
    });
    this.code.update(loc.end.index - 1, loc.end.index, '}');
    this.currentIndex = loc.end.index;
  }
  /**
   * @description: Parse literals
   * @param {VariableDeclarator} node
   */
  generateLiteral(node: VariableDeclarator): void {
    const { loc, id, init } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (id?.type === NodeType.Identifier) {
      this.code.update(id.loc.start.index, id.loc.end.index, id.name);
      this.currentIndex = id.loc.end.index;
    }
    if (id?.type === NodeType.ArrayPattern) {
      this.generateArrayPattern(id);
    }
    if (id?.type === NodeType.ObjectPattern) {
      this.generateObjectPattern(id);
    }
    if (init && id) {
      this.code.addSpaceBothSlide(id.loc.end.index, init?.loc.start.index, '=');
      if (init.type === NodeType.Literal) {
        this.code.update(init.loc.start.index, init.loc.end.index, init.raw);
        this.currentIndex = init.loc.end.index;
        this.code.update(init.loc.end.index, init.loc.end.index + 1, ';');
        this.currentIndex = init.loc.end.index + 1;
      }
      if (init.type === NodeType.Identifier) {
        this.code.update(init.loc.start.index, init.loc.end.index, init.name);
        this.currentIndex = init.loc.end.index;
        this.code.update(init.loc.end.index, init.loc.end.index + 1, ';');
        this.currentIndex = init.loc.end.index + 1;
      }
      if (init.type === NodeType.ArrayExpression) {
        this.generateArrayExpression(init);
      }
      if (init.type === NodeType.ObjectExpression) {
        this.generateObjectExpression(init);
      }
      if (init.type === NodeType.ArrowFunctionExpression) {
        this.generateArrowFunctionExpressionExpression(init);
        this.code.update(init.loc.end.index, init.loc.end.index + 1, ';');
        this.currentIndex = init.loc.end.index + 1;
      }
      if (init.type === NodeType.FunctionExpression) {
        this.generateFunctionExpression(init);
      }
      if (init.type === NodeType.CallExpression) {
        this.generateCallExpression(init);
      }
    }
  }
  generateFunctionExpression(node: FunctionExpression): void {
    const { loc, id, params = [], body, async, generator } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (async) {
      this.code.update(loc.start.index, loc.start.index + 14, 'async function');
      this.currentIndex = loc.start.index + 14;
    } else {
      this.code.update(loc.start.index, loc.start.index + 8, 'function');
      this.currentIndex = loc.start.index + 8;
    }
    if (id) {
      if (generator) {
        this.code.update(id?.loc.start.index - 1, id?.loc.start.index, '*');
        this.currentIndex = id?.loc.start.index;
      }
      this.generateIdentifier(id);
    }
    if (params.length > 0) {
      this.generateFunctionParams(params);
    } else {
      if (id) {
        this.code.update(id.loc.end.index, id.loc.end.index + 2, '()');
        this.currentIndex = id.loc.end.index + 2;
      } else {
        this.code.update(loc.start.index + 8, loc.start.index + 13, '()');
        this.currentIndex = loc.start.index + 13;
      }
    }
    if (body.type === NodeType.BlockStatement) {
      this.generateBlockStatement(body);
    }
    this.code.update(loc.end.index, loc.end.index + 1, ';');
    this.currentIndex = loc.end.index + 1;
  }
  generateArrowFunctionExpressionExpression(
    node: ArrowFunctionExpression | FunctionExpression,
  ): void {
    const { params = [], id, loc, body, async } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    let arrowStart = loc.start.index;
    if (async) {
      this.code.update(loc.start.index, loc.start.index + 5, 'async');
      this.currentIndex = loc.start.index + 5;
      arrowStart += 5;
    }
    if (params.length > 0) {
      this.generateFunctionParams(params);
      arrowStart = params[params.length - 1].loc.end.index + 1;
    } else {
      if (id) {
        this.code.update(id.loc.end.index, id.loc.end.index + 2, '()');
        this.currentIndex = id.loc.end.index + 2;
        arrowStart = id.loc.end.index + 3;
      } else {
        this.code.update(arrowStart, arrowStart + 2, '()');
        this.currentIndex = arrowStart + 2;
        arrowStart += 2;
      }
    }
    const arrowEnd = body.loc.start.index;
    this.code.addSpaceBothSlide(arrowStart, arrowEnd, '=>');
    this.currentIndex = arrowEnd;
    if (body.type === NodeType.BlockStatement) {
      this.generateBlockStatement(body);
    }
  }
  /**
   * @description: Analytic variable declaration
   * @param {VariableDeclaration} node
   */
  generateVariableDeclaration(node: VariableDeclaration): void {
    const { loc, declarations, kind } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + kind.length, kind);
    this.currentIndex = loc.start.index + kind.length;
    declarations.forEach((declaration) => {
      const { type } = declaration;
      if (type === NodeType.VariableDeclarator) {
        return this.generateLiteral(declaration);
      }
    });
    // this.code.update(this.currentIndex, this.currentIndex + 1, ';')
    // this.currentIndex = loc.end.index
  }
  generateForInStatement(node: ForInStatement): void {
    const { type, left, right, body, loc } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + 4, 'for(');
    this.currentIndex = loc.start.index + 4;
    if (type === NodeType.ForInStatement) {
      const { declarations = [] } = left;
      this.code.update(
        left.loc.start.index,
        left.loc.start.index + left.kind.length,
        left.kind,
      );
      this.currentIndex = left.loc.start.index + left.kind.length;
      declarations.forEach((item: VariableDeclarator) => {
        if (item.type === NodeType.VariableDeclarator) {
          this.generateLiteral(item);
        }
      });
      this.code.update(left.loc.end.index, left.loc.end.index + 4, ' in ');
      this.currentIndex = left.loc.end.index + 4;
      if (right?.type === NodeType.Identifier) {
        this.generateIdentifier(right);
        this.code.update(right.loc.end.index, right.loc.end.index + 1, ')');
        this.currentIndex = right.loc.end.index + 1;
      }
      if (body.type === NodeType.BlockStatement) {
        this.generateBlockStatement(body);
      }
    }
  }
  generateForStatement(node: ForStatement): void {
    const { type, init, update, test, body, loc } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + 4, 'for(');
    this.currentIndex = loc.start.index + 4;
    if (init.type === NodeType.VariableDeclaration) {
      this.generateVariableDeclaration(init);
    }
    if (update?.type === NodeType.ExpressionStatement) {
      this.generateExpressionStatement(update);
      this.code.update(update.loc.end.index, update.loc.end.index + 1, ')');
      this.currentIndex = update.loc.end.index + 1;
    }
    if (test?.type === NodeType.ExpressionStatement) {
      this.generateExpressionStatement(test);
      this.code.update(test.loc.end.index, test.loc.end.index + 1, ';');
      this.currentIndex = test.loc.end.index + 1;
    }
    if (body.type === NodeType.BlockStatement) {
      this.generateBlockStatement(body);
    }
  }
  generateSwitchStatement(node: SwitchStatement): void {
    const { loc, type, discriminant, cases = [] } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + 6, 'switch');
    this.currentIndex = loc.start.index + 6;
    this.code.update(
      discriminant.loc.start.index - 1,
      discriminant.loc.start.index,
      '(',
    );
    this.currentIndex = discriminant.loc.start.index;
    if (discriminant.type === NodeType.Identifier) {
      this.generateIdentifier(discriminant);
    }
    this.code.update(
      discriminant.loc.end.index,
      discriminant.loc.end.index + 2,
      '){',
    );
    this.currentIndex = discriminant.loc.end.index + 2;
    cases.forEach((item) => {
      const { type, loc, test, consequent = [] } = item;
      if (test?.type === NodeType.Literal) {
        this.code.update(loc.start.index, loc.start.index + 4, 'case');
        this.code.update(test.loc.start.index, test.loc.end.index, test.raw);
        this.code.update(test.loc.end.index, test.loc.end.index + 1, ':');
        this.currentIndex = test.loc.end.index + 1;
      } else {
        this.code.update(loc.start.index, loc.start.index + 8, 'default:');
        this.currentIndex = loc.start.index + 8;
      }
      consequent.forEach((exp) => {
        const { loc } = exp;
        if (exp.type === NodeType.ExpressionStatement) {
          this.generateExpressionStatement(exp);
        }
        this.code.update(loc.end.index, loc.end.index + 1, ';');
      });
      if (consequent.length === 0) {
        this.code.update(this.currentIndex, this.currentIndex + 1, ';');
      }
    });
    this.code.update(loc.end.index - 1, loc.end.index, '}');
    this.code.update(loc.end.index, loc.end.index + 1, ';');
    this.currentIndex = loc.end.index + 1;
  }
  generateIfStatement(node: IfStatement): void {
    const { loc, test, consequent, alternate } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + 2, 'if');
    this.code.update(test.loc.start.index - 1, test.loc.start.index, '(');
    this.currentIndex = test.loc.start.index;
    if (test.type === NodeType.Identifier) {
      this.generateIdentifier(test);
    }
    this.code.update(test.loc.end.index, test.loc.end.index + 1, ')');
    this.currentIndex = test.loc.end.index + 1;
    if (consequent.type === NodeType.ExpressionStatement) {
      this.generateExpressionStatement(consequent);
    }
    if (consequent.type === NodeType.BlockStatement) {
      this.generateBlockStatement(consequent);
    }
  }
  generateForOfStatement(node: ForOfStatement): void {
    const { type, left, right, body, loc } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    this.code.update(loc.start.index, loc.start.index + 4, 'for(');
    this.currentIndex = loc.start.index + 4;
    if (type === NodeType.ForOfStatement) {
      const { declarations = [] } = left;
      this.code.update(
        left.loc.start.index,
        left.loc.start.index + left.kind.length,
        left.kind,
      );
      this.currentIndex = left.loc.start.index + left.kind.length;
      declarations.forEach((item: VariableDeclarator) => {
        if (item.type === NodeType.VariableDeclarator) {
          this.generateLiteral(item);
        }
      });
      this.code.update(left.loc.end.index, left.loc.end.index + 4, ' of ');
      this.currentIndex = left.loc.end.index + 4;
      if (right?.type === NodeType.Identifier) {
        this.generateIdentifier(right);
        this.code.update(right.loc.end.index, right.loc.end.index + 1, ')');
        this.currentIndex = right.loc.end.index + 1;
      }
      if (body.type === NodeType.BlockStatement) {
        this.generateBlockStatement(body);
      }
    }
  }
  generateLabeledStatement(node: LabeledStatement): void {
    const { type, label, body, loc } = node;
    if (loc.start.line > this.currentLine) {
      this.currentLine = loc.start.line;
      this.code.update(this.currentIndex, this.currentIndex + 1, '\n');
      this.currentIndex++;
    }
    if (label.type === NodeType.Identifier) {
      this.code.update(label.loc.start.index, label.loc.end.index, label.name);
      this.code.update(label.loc.end.index, label.loc.end.index + 1, ':');
      this.currentIndex = label.loc.end.index + 1;
    }
    this.generateExpressionStatement(body);
  }
  render(): string {
    const nodes = this.ast.body;
    nodes.forEach((node) => {
      const { type } = node;
      if (type === NodeType.VariableDeclaration) {
        return this.generateVariableDeclaration(node);
      }
      if (type === NodeType.FunctionDeclaration) {
        return this.generateFunctionDeclaration(node);
      }
      if (type === NodeType.ImportDeclaration) {
        return this.generateImportDeclaration(node);
      }
      if (type === NodeType.ExportNamedDeclaration) {
        return this.generateExportNamedDeclaration(node);
      }
      if (type === NodeType.ExportAllDeclaration) {
        return this.generateExportAllDeclaration(node);
      }
      if (type === NodeType.ExportDefaultDeclaration) {
        return this.generateExportDefaultDeclaration(node);
      }
      if (type === NodeType.ExpressionStatement) {
        return this.generateExpressionStatement(node);
      }
      if (type === NodeType.BlockStatement) {
        return this.generateBlockStatement(node);
      }
      if (type === NodeType.ForInStatement) {
        return this.generateForInStatement(node);
      }
      if (type === NodeType.ForOfStatement) {
        return this.generateForOfStatement(node);
      }
      if (type === NodeType.ForStatement) {
        return this.generateForStatement(node);
      }
      if (type === NodeType.SwitchStatement) {
        return this.generateSwitchStatement(node);
      }
      if (type === NodeType.IfStatement) {
        return this.generateIfStatement(node);
      }
      if (type === NodeType.ReturnStatement) {
        return this.generateReturnStatement(node);
      }
      if (type === NodeType.LabeledStatement) {
        return this.generateLabeledStatement(node);
      }
    });
    return this.code.toString();
  }
}
