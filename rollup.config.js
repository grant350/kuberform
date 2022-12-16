// import css from  'rollup-plugin-css-only';
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const packageJson = require('./package.json');


module.exports =  {
  input:'app-src/kuberform/index.js',
  output: [{
    dir:"dist/cjs",
    format:"cjs",
    sourcemap: true,
    inlineDynamicImports:true
  },
  {
    dir:"dist/esm",
    format:"esm",
    sourcemap: true,
    inlineDynamicImports:true
  }
],
external: ['/@babel\/runtime/','react'],
plugins: [babel({
  plugins:["@babel/plugin-transform-runtime","@babel/plugin-syntax-jsx","@babel/plugin-syntax-dynamic-import","@babel/plugin-proposal-class-properties"],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  babelHelpers:'runtime'
})]

}