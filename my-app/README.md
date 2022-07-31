## Create CDK React App

This mono-repo contains both the AWS CDK Application and React Application. The mono-repo is managed via [npm `workspaces`](https://docs.npmjs.com/cli/v7/using-npm/workspaces). The available workspaces as defined at the root of the project's `package.json` file are listed below-

- `ccra-react-app` : The React application
- `ccra-cdk-app` : The AWS Cloud Development Kit application (CDK)

Since this is a mono-repo scaffolded using NPM workspaces, all commands shown below can be executed from the root of the project directory.

**IMPORTANT**: You must be using atleast NPM Version 7 to be able to use workspaces. If you are unable to use NPM V7 then you can continue to use npm by switching inside the respective app directories (for React app, and CDK app)

---

### React App

Install dependencies of React application

```bash
npm install --save -w ccra-react-app
```

To install a new dependency for the React app

```bash
npm install --save <lib> -w ccra-react-app
```

Where `<lib>` is the dependency.

To start the React app server

```bash
npm run react-app-start
```

To build the react app

```bash
npm run react-app-build
```

---

### AWS CDK App

Install dependencies for your AWS CDK app.

```bash
npm install --save -w ccra-cdk-app
```

> WARNING ⚠️ : You must bootstrap CDK before proceeding with deployment. Please refer to [documentation](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html).

To bootstrap CDK

```bash
cd ccra-cdk-app && cdk bootstrap ...
```

To Synthesize CDK app

```bash
npm run cdk-app-synth
```

To deploy the CDK app

```bash
npm run cdk-app-deploy
```

To delete the CDK app (⚠️ CAUTION: This will delete resources from the AWS Account)

```bash
npm run cdk-app-destroy
```
