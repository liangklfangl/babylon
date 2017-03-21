'use strict';
const babel = require('babel-core');
const types = require('babel-types');
const traverse = require('babel-traverse').default;
const generator = require('babel-generator').default;

const errorBoxStyle = {
  padding: 10,
  background: 'rgb(204, 0, 0)',
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: '16px',
  fontWeight: 'bold',
  overflow: 'auto',
};

//requireGenerator('ReactDOM', 'react-dom')
function requireGenerator(varName, moduleName) {
  return types.variableDeclaration('var', [
    //t.variableDeclaration(kind, declarations)
    //kind: "var" | "let" | "const" (required)
   // declarations: Array<VariableDeclarator> (required)
    types.variableDeclarator(
      //t.variableDeclarator(id, init)
      //id: LVal (required)
     // init: Expression (default: null)
      types.identifier(varName),
      //variable name is an identifier
      types.callExpression(
        types.identifier('require'),
        [types.stringLiteral(moduleName)]
        //You can see this in https://astexplorer.net/#/tSIO7NIclp/3
        //Example is "var name ='qinliang'"
        //Through this , you can come to know id and init in t.variableDeclarator(id, init)
        //Watch out `id` and `init` in ast
      )
    ),
  ]);
}

const defaultBabelConfig = {
  presets: ['es2015-ie', 'react', 'stage-0'],
};

/**
 * [exports We receive sourceCode ,babelConfig, noreact]
 * @param  {[type]} code        [description]
 * @param  {Object} babelConfig [description]
 * @param  {[type]} noreact     [description]
 * @return {[type]}             [description]
 * transformer(code, babelConfig, noreact);
 */
module.exports = function transformer(
  code,
  babelConfig = {},
  noreact
) {
  let codeAst = null;
  try {
    const { ast } = babel.transform(code, Object.assign({}, defaultBabelConfig, babelConfig));
    //transform method is from babel-core
    //babel-core is the Babel compiler itself; it exposes the babel.transform method, 
    //where transformedCode = transform(src).code.
    codeAst = ast;
  } catch(e) {
    console.error(e);
    return `function() { ` +
      `  var React = require('react');` +
      `  return React.createElement('pre', {` +
      `    style: ${JSON.stringify(errorBoxStyle)}` +
      `  }, '${e.toString()}'); ` +
      `}`;
  }
  let renderReturn = null;
  //traverse method is from babel-traverse
  traverse(codeAst, {
    CallExpression: function(callPath) {
      const callPathNode = callPath.node;
      if (callPathNode.callee &&
          callPathNode.callee.object &&
          callPathNode.callee.object.name === 'ReactDOM' &&
          callPathNode.callee.property &&
          callPathNode.callee.property.name === 'render') {

        renderReturn = types.returnStatement(
          callPathNode.arguments[0]
        );
        //We construct returnStatement manually
        //t.returnStatement(argument)
        callPath.remove();
      }
    },
  });
  const astProgramBody = codeAst.program.body;
  //we can get updated codeAST from .program.body
  if (!noreact) {
    astProgramBody.unshift(requireGenerator('ReactDOM', 'react-dom'));
    astProgramBody.unshift(requireGenerator('React', 'react'));
  }
  // ReactDOM.render always at the last of preview method
  // We put ReactDOM.render method's first argument to ast body ending with ReactDOM.render node removed
  if (renderReturn) {
    astProgramBody.push(renderReturn);
  }

  const codeBlock = types.BlockStatement(astProgramBody);
  //We then construct an BlockStatement for functionDeclaratin
  const previewFunction = types.functionDeclaration(
    //t.functionDeclaration(id, params, body, generator, async)
    //id: Identifier (required)
    // params: Array<LVal> (required)
    // body: BlockStatement (required)
    // generator: boolean (default: false)
    // async: boolean (default: false)
    // returnType (default: null)
    // typeParameters (default: null)
    types.Identifier('preview'),
    [],
    codeBlock
  );
  //t.program(body, directives)
  //body: Array<Statement> (required)
  // directives: Array<Directive> (default: [])
  // Through this, we can see that in program.body we only have a funciton returned
  return generator(types.program([previewFunction]), null, code).code;
};