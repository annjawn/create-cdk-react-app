const cdklanguages = ['javascript', 'typescript'];
const gitignore = `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# vscode intellisense
jsconfig.json
.vscode

# CDK asset staging directory
.cdk.staging
cdk.out`;

const npmconfig = `{
    "name": "create-cdk-react-app",
    "scripts":{
      "react-app-start": "npm start -w ccra-react-app",
      "react-app-build": "npm run build -w ccra-react-app",
      "react-app-test": "npm run test -w ccra-react-app",
      "react-app-eject": "npm run eject -w ccra-react-app",
      "cdk-app-deploy": "npm run cdk-deploy -w ccra-cdk-app",
      "cdk-app-destroy": "npm run cdk-destroy -w ccra-cdk-app",
      "cdk-app-synth": "npm run cdk-synth -w ccra-cdk-app",
      "cdk-app-test": "npm run test -w ccra-cdk-app"
    },
    "workspaces": [
      "ccra-react-app",
      "ccra-cdk-app"
    ]
  }`

const npmconfigts = `{
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
  }`;

const readme = `## Create CDK React App

This mono-repo contains both the AWS CDK Application and React Application. The mono-repo is managed via [npm \`workspaces\`](https://docs.npmjs.com/cli/v7/using-npm/workspaces). The available workspaces as defined at the root of the project's \`package.json\` file are listed below-

- \`ccra-react-app\` : The React application
- \`ccra-cdk-app\` : The AWS Cloud Development Kit application (CDK)

Since this is a mono-repo scaffolded using NPM workspaces, all commands shown below can be executed from the root of the project directory.

**IMPORTANT**: You must be using atleast NPM Version 7 to be able to use workspaces. If you are unable to use NPM V7 then you can continue to use npm by switching inside the respective app directories (for React app, and CDK app)

---

### React App

Install dependencies of React application

\`\`\`bash
npm install --save -w ccra-react-app
\`\`\`

To install a new dependency for the React app

\`\`\`bash
npm install --save <lib> -w ccra-react-app
\`\`\`

Where \`<lib>\` is the dependency.

To start the React app server

\`\`\`bash
npm run react-app-start
\`\`\`

To build the react app

\`\`\`bash
npm run react-app-build
\`\`\`

---

### AWS CDK App

Install dependencies for your AWS CDK app.

\`\`\`bash
npm install --save -w ccra-cdk-app
\`\`\`

> WARNING ⚠️ : You must bootstrap CDK before proceeding with deployment. Please refer to [documentation](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html).

To bootstrap CDK

\`\`\`bash
cd ccra-cdk-app && cdk bootstrap ...
\`\`\`

To Synthesize CDK app

\`\`\`bash
npm run cdk-app-synth
\`\`\`

To deploy the CDK app

\`\`\`bash
npm run cdk-app-deploy
\`\`\`

To delete the CDK app (⚠️ CAUTION: This will delete resources from the AWS Account)

\`\`\`bash
npm run cdk-app-destroy
\`\`\`
`;

module.exports = {
    cdklanguages,
    gitignore,
    npmconfig,
    npmconfigts,
    readme
}