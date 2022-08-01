<p align="center">
  <img width="360" src="https://user-images.githubusercontent.com/84933469/182047857-4572ae95-5ab0-488e-8ac5-cb84edae7d7c.png">
  <p align="center">BUILD MODERN REACT APPS POWERED BY AWS CLOUD </p>  
</p>

---
![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)
[![Latest Version](https://img.shields.io/github/tag/aws-samples/aws-ai-intelligent-document-processing)](https://github.com/annjawn/create-cdk-react-app/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/annjawn/create-cdk-react-app/blob/main/LICENSE)


## Overview

Just do

```sh
npx create-cdk-react-app my-new-app
cd my-new-app
```

Or specify language

```sh
npx create-cdk-react-app my-app --cdk typescript --react typescript
cd my-new-app
```

And you are off to the races into building your modern React web app with AWS backend.
  
![Alt Text](https://user-images.githubusercontent.com/84933469/182047885-e9a34ece-9830-4a13-b981-d512cb637c3c.gif)

## Usage

```sh
npx create-cdk-react-app [app-name] [options]
```

### Options

| Option | Required | Description                                                                                                                      |
|-------------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| `--cdk`           | Optional | Either `javascript` or `typescript`.  <br/> Will initialize the cdk app with the language specified.<br/> Defaults to `javascript`.          |
| `--react`         | Optional | Either `javascript` or `typescript`. <br/> Will initialize the create react app with the language specified. <br/> Defaults to `javascript`. |

---
## How to work with the project?

CCRA uses NPM's [Workspace](https://docs.npmjs.com/cli/v8/using-npm/workspaces) to setup the project as a mono-repo. This means that you can run your npm commands from the root to develop, test, and build the CDK app and the React app from the root of the project without having to worry about individual project setup. This is also helpful for setting up CI/CD, and project dependencies (for example- getting AWS resource ARNs as config file for your React App). 

## Workspace setup

The project uses a `package.json` to setup workspaces. There are two workspaces in the scaffolding

- `ccra-react-app` workspace for the React App
- `ccra-cdk-app` workspace for the AWS CDK App

The `package.json` also defines shortcuts for running the npm scripts for each of these workspaces from the root of the project. The following sections explains how.

### React App

Install dependencies for the React application

```bash
npm install --save -w ccra-react-app
```

To install a new dependency for the React app

```bash
npm install --save <lib> -w ccra-react-app
```

Where `<lib>` is the npm library you wish to install. For example, to install [date-fns](https://date-fns.org/) as a dependency for the React app.

```bash
npm install --save date-fns -w ccra-react-app
```

To start the React app server

```bash
npm run react-app-start
```

To build the react app

```bash
npm run react-app-build
```

To test the react app 

```bash
npm run react-app-test
```

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

To Synthesize a CloudFormation template from the AWS CDK App

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

---

## Advanced Usage

At the core of a CCRA bootstrapped project, there are three `package.json` files that work in tandem with each other to give you a great development, testing, and deployment experience.

```
├── my-app
│   ├── ccra-react-app
│   │   └── package.json
└── ccra-cdk-app
    │   └── package.json
    └── package.json
```

You may modify the `package.json` at the root of the project to customize the npm script shortcuts per your requirements. CCRA generates the following `package.json` at the root of the project, out of the box-

```json
{
    "name": "create-cdk-react-app",
    "scripts":{
      "react-app-start": "npm start -w ccra-react-app",
      "react-app-build": "npm run build -w ccra-react-app",
      "react-app-test": "npm run test -w ccra-react-app",
      "react-app-eject": "npm run eject -w ccra-react-app",
      "cdk-app-deploy": "npm run cdk deploy -w ccra-cdk-app",
      "cdk-app-destroy": "npm run cdk destroy -w ccra-cdk-app",
      "cdk-app-synth": "npm run cdk synth -w ccra-cdk-app",
      "cdk-app-test": "npm run test -w ccra-cdk-app"
    },
    "workspaces": [
      "ccra-react-app",
      "ccra-cdk-app"
    ]
}
```

You can customize "scripts" to suit your needs. Please keep in mind, the scripts in this `package.json` are just references to scripts found in the individual project's `package.json` scripts. For example -

```json
"react-app-build": "npm run build -w ccra-react-app"
```

points to the workspace `ccra-react-app` (which is the React App) `package.json` script-

```json
"build": "react-scripts build"
```

 The `ccra-react-app` and `ccra-cdk-app`'s `package.json` files are from native CDK project template and Create React App template. 

---

### License

MIT-0 (see [liecense](./LICENSE))