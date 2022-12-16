import css from  'rollup-plugin-css-only';
import babel from '@rollup/plugin-babel';

export default {
  input:'app-src/formbuilder/index.js',
  output: [{
    dir:"dist/cjs",
    format:"cjs",
    inlineDynamicImports:true
  },
  {
    dir:"dist/esm",
    format:"esm",
    inlineDynamicImports:true
  }
],
  externals: ['/@babel\/runtime/','react'],
  plugins: [babel({babelHelpers:'runtime'})]

}