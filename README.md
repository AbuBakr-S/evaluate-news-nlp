# evaluate-news-nlp
A web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites.

## Adding Webpack to a Project - Checklist
1. Prerequisites
    - Make sure you have Node installed. Download [here](https://nodejs.org/en/download/)
    - Run `node -v` and `npm -v` to check versions
    - Upgrade to the latest version of npm, if already installed but version is old:
    ```
    npm install -g npm@latest
    npm install
    ```
    - If the npm install throws NPM error, try clearing the cache and a fresh re-install, using:
    ```
    npm cache clean 
    [sudo] npm install -g npm 
    npm install
    ```
    If it asks to fix the vulnerabilities, run `npm audit fix`

2. Install Webpack
    - Run `npm i webpack webpack-cli`
    - In `package.json`, verify if `webpack` and `webpack-cli` are added to the `"dependencies"`
    - In package.json, add a build npm script as:
    ```
    "scripts": {
    "build": "webpack"
    },
    ```
    - Lastly, verify the dependency for the development in `"devDependencies"` block inside `package.json` as:
    ```
    "devDependencies":{
    "webpack-dev-server": "^3.11.0",
    },
    ```
    - Create a `webpack.config.js` file in the root location of your project, and add the necessary `require` statements, and a blank `module.exports` code as:
    ```
    const path = require("path")
    const webpack = require("webpack")
    module.exports = {
    }
    ```

3. Webpack Entry - Starting point to map asset tree
    - The default location for the webpack entry point is `./src/index.js`. Depending on your file structure, you may have to change this to a custom entry point. For example, in `webpack.config.js`, mention the entry point as:
    ```
    module.exports = {
        entry: './src/client/index.js'
    }
    ```
    - To build the app, run `npm run build`
    - After running the build command successfully, verify that a `dist` directory is created in the root, containing the bundled file `main.js`

4. Output and Loaders - Transfer files of one type into another. Webpack only understands JS and JSON
    - Hardcode a reference to your JS into the `index.html`. For example: `<script type="text/javascript" src="../../../dist/main.js"></script>`
    - Use Babel to convert vanilla.js into ES6 files
    - Install Babel to allow the use of `import` (ES6):
    `npm i -D @babel/core @babel/preset-env babel-loader`
    - Create a new file .babelrc in the root of the project. Fill it with this code:
    `{ ‘presets’: ['@babel/preset-env'] }`
    - Add Babel Loader to `webpack.config.js`
    ```
    module: {
            rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    }
                ]
    }
    ```
    - Import JS files into `index.js`. For example:
    ```
    import { checkForName } from './js/nameChecker'
    import { handleSubmit } from './js/formHandler'
    console.log(checkForName);
    ```
    - Delete the current `dist` folder and rerun the `build` command. Can use `rm -rf dist` in the Terminal
    - The `rules` array will contain all of our loaders, each loader specifies what types of files it will run on by running a regex matcher - in the case above we are looking for all `.js` files - the `$` at the end simply means that nothing comes after that
    - Exclude node modules to save time

5. Plugins - Perform wider range of tasks like bundle optimisation, asset management, automatically adding asset references to an `html` file
    - Install the html webpack plugin: `npm i -D html-webpack-plugin`
    - Require the plugin at the top of weboack config: `const HtmlWebpackPlugin = require('html-webpack-plugin')`
    - Add a plugins list to the webpack config under `module.exports` and instantiate the plugin:
    ```
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        })
    ]
    ```
    - Run webpack and observe new `dist` folder output
    - Update server file. Change the home route to use the index file form `dist`:
      ```
      app.get('/', function (req, res){
          res.sendFile('dist/index.html')
      })
      ```
    - Upload server file to look for asset files in the `dist` instead of client. In `<project_root_directory>/src/server/index.js` file, change path:
    From: `app.use(express.static('src/client'))` To: `app.use(express.static('dist'))`
    - Run the server

6. Mode
    - Config Changes:
        1. PROD - Create a copy of the `webpack.config.js`, and rename it as `webpack.prod.js`. This file should have mode: `'production'` statement in `module.exports`
        2. DEV - Now, rename the `webpack.config.js` to `webpack.dev.js`. This file should have the following statements in `module.exports`:
        ```
        mode: 'development',
        devtool: 'source-map'
        ```
    - `package.json` Changes:
    "scripts": {
        "build-prod": "webpack --config webpack.prod.js",
        "build-dev": "webpack --config webpack.dev.js"
    }
    - Remove `"build": "webpack"` script from `package.json`
    - `npm run build-dev`

7. Convenience in Webpack
    Hot Reload
        - Webpack Dev Server helps in live reloading of the page, only for Development mode, and automatically re-builds the application
        - Install the Webpack Dev Server: `npm i -D webpack-dev-server`
        - Change `build-dev` script in `package.json` to `"build-dev": "webpack-dev-server --config webpack.dev.js --open"`. This will open a new browser window with our app running
    Old Code in Dist Folder
        - When you rebuild, new code will be added to the bundled files, but if there was old code that you got rid of, webpack build does not remove the old stuff
        - The webpack plugin called `Clean` will remove all files inside webpack's `output.path` directory, as well as all unused webpack assets after every successful rebuild
        - Install the Clean Webpack Plugin `npm i -D clean-webpack-plugin`
        - Require the plugin at the top of the config file: `const { CleanWebpackPlugin } = require('clean-webpack-plugin');`
        - Add the plugin to Plugins array in the `module.exports` in webpack.de
        ```
        new CleanWebpackPlugin({
                // Simulate the removal of files
                dry: true,
                // Write Logs to Console
                verbose: true,
                // Automatically remove all unused webpack assets on rebuild
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false
        })
        ```
        - Rerun `build` script
    Source Maps
        - Controls if and how source maps are generated. Source Maps are a neat method of getting access to the original source code when debugging compiled applications