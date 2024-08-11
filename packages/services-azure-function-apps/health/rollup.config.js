import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js', // Entry point of your application
  output: {
    file: 'dist/bundle.js', // Output bundle file
    format: 'cjs', // Output format (CommonJS in this case)
    sourcemap: true, // Generate source map
  },
  plugins: [
    resolve(), // Resolve modules from node_modules
    commonjs(), // Convert CommonJS modules to ES6
    json(), // Import JSON files
    terser() // Minify the output
  ]
};
