# Installation

In this tutorial, we will set up an example project that uses Baseloop.

## Setting up dependencies

Let's start by creating an empty NPM project somewhere on your disk:

```
npm init 
```

To get started with Baseloop, we recommend you to install the dev package first:

```
npm install --save-dev @baseloop/dev
```

This dev package comes with a command line tool that we will use next.

## Creating our example project 

Create the example project with our newly installed tool:

```
npx baseloop new project
```

Now you should have a similar project structure:

```
config/
  webpack/
    client-base.js
    client-dev.js
    common.js
    server-base.js
    server-dev.js
src/
  client/
    index.js
  common/
    about/
      about-controller.js
      about-view.js
    app/
      app-controller.js
      app-view.js
    home/
      home-view.js
    static/
      favicon.png
      index.html
  server/
    index.js
package.json
```

Let's explain the project structure, which you are of course free to modify as you please.

The configuration files are located under `config/`, grouped by the type of configuration (`webpack/` for example).
The Webpack configuration is mostly defined in `common.js`, which is used by both frontend and backend (hence "common").
Then we have the individual configuration files for both backend and frontend. 
We also have separate `dev` and `prod` files for development and production purposes.

We will not go through Webpack configuration as that is something you can learn through their documentation.
You can also use another bundler such as [Parcel](https://parceljs.org/) or [Rollup](https://rollupjs.org/) if you like.

The main source code lies under `src/`, grouped in `client/`, `common/` and `server/` folders. The `common/` folder is
used for almost all source code, because we are writing a universal JavaScript app that can render your app on the server
side as well.

We prefer grouping source code based on *features* instead of types of code. This means we want all the code related
to one feature to lie within their own separate folder. Therefore we do not have folders such as `controllers/` or `views/`,
but instead folders such as `app/`, `about/`, `profile/`, `todos/`, `feature-x/`, etc.

## Running the example

The cli tool should have added the following line to your `package.json` file:

```
"scripts": {
  "dev": "baseloop dev --config-client config/webpack/client-dev.js --config-server config/webpack/server-dev.js --server dist/server/index.js"
}
```

We can run our example with it:

```
npm run dev
```

```
∞ Baseloop auto-reload server is running at ws://localhost:3456/
∞ Starting Webpack client watcher...
∞ Baseloop development server is running at http://localhost:8080/
...
```

Congrats! You may now access your app from the given URL.
