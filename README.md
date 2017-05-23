# Studykit Frontend

**We use [Yarn](https://yarnpkg.com/en/) to work with cli. You can do it with [npm](https://www.npmjs.com/).**

In most cases this is the only command you need:

```sh
yarn start
```

To start the server (without sass compiling):

```shell
yarn start-js
```

To build the project:

```shell
yarn build
```

To run tests:

```shell
yarn test
```

To change port from default 3000 you can create an .env file with:

```shell
PORT=9000
```

**Stylesheets made with sass, so we need to compile it. We wrote some commands to work with sass:**

Start the server and watch for sass changes:

```shell
yarn start
```

Just watch for sass:

```shell
yarn watch-sass
```

Compile sass styles:

```shell
yarn build-sass
```

**You can find the most recent version of Create React App guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).**