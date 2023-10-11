// const HtmlWebPackPlugin = require('html-webpack-plugin');
// const path = require('path');

// module.exports = {
//   entry: path.resolve(__dirname, 'src', 'index.tsx'),
//   module: {
//     rules: [
//       {
//         test: /\.ts|\.tsx$/,
//         loader: "ts-loader",
//       },
//     ]
//   },

//   plugins: [
//     new HtmlWebPackPlugin({
//       template: "./src/index.html",
//       filename: "./index.html"
//     })
//   ],
//   resolve: {
//     extensions: ['.ts', '.tsx'],
//   },
// };
// var path = require('path');
// var webpack = require('webpack');
// var sassLintPlugin = require('sasslint-webpack-plugin');

// module.exports = {
//   entry: [
//     'webpack-dev-server/client?http://localhost:8080',
//     'webpack/hot/dev-server',
//     './src/index.tsx',
//   ],
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: 'http://localhost:8080/',
//     filename: 'dist/bundle.js',
//   },
//   devtool: 'source-map',
//   resolve: {
//     extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
//   },
//   module: {
//     rules: [{
//       test: /\.js$/,
//       loader: 'source-map-loader',
//       exclude: /node_modules/,
//       enforce: 'pre',
//     }, {
//       test: /\.tsx?$/,
//       loader: 'tslint-loader',
//       exclude: /node_modules/,
//       enforce: 'pre',
//     }, {
//       test: /\.tsx?$/,
//       loaders: [
//         'react-hot-loader/webpack',
//         'awesome-typescript-loader',
//       ],
//       exclude: /node_modules/,
//     }, {
//       test: /\.scss$/,
//       loaders: ['style', 'css', 'sass']
//     }, {
//       test: /\.css$/,
//       loaders: ['style', 'css']
//     }],
//   },
//   externals: {
//     'react': 'React',
//     'react-dom': 'ReactDOM'
//   },
//   plugins: [
//     new sassLintPlugin({
//       glob: 'src/**/*.s?(a|c)ss',
//       ignoreFiles: ['src/normalize.scss'],
//       failOnWarning: false, // Do it.
//     }),
//     new webpack.HotModuleReplacementPlugin(),
//   ],
//   devServer: {
//     contentBase: './'
//   },
// };
module.exports = {
  //mode: "production", 
    mode: "development", devtool: "inline-source-map",

    entry: [ "./src/app.tsx"/*main*/ ], 
    output: {
        filename: "./bundle.js"  // in /dist
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
    },
    module: {
        rules: [

            { test: /\.tsx?$/, loader: "ts-loader" }, 

            { test: /\.scss$/, use: [ 
                { loader: "style-loader" },  // to inject the result into the DOM as a style block
                { loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                { loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                { loader: "sass-loader" },  // to convert SASS to CSS
                // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
            ] }, 

        ]
    }
}; 