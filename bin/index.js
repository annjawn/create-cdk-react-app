#! /usr/bin/env node
const { shell, exec } = require('./shellexec');
const color = require('colors-cli/safe');
const logSymbols = require('log-symbols');
const { readFileSync } = require('fs');
const ora = require('ora');
const { cdklanguages, gitignore, npmconfig, npmconfigts, readme } = require('./config');
const argv = require('minimist')(process.argv.slice(2));

const error = color.red.bold;
const warn = color.yellow;
const notice = color.blue;
const success = color.green.bold;

const logsuccess = (text) => console.log(logSymbols.success, success(text));
const logwarn = (text) => console.log(logSymbols.warning, warn(text));
const logerror = (text) => console.log(logSymbols.error, error(text));
const loginfo = (text) => console.log(logSymbols.info, notice(text));

logwarn("Usage: npx create-cdk-react-app my-new-app --cdk[optional] typescript --react[optional] typescript");

const validate = async() => {
    
    if(argv['_'][0]){
        loginfo(`Creating new app in ~/${argv['_'][0]}`)
        shell.mkdir('-p', argv['_'][0]);
    };
    // shell.exit(1);

    if (!argv.cdk){
        logwarn("AWS CDK language not provided via -cdk. Defaulting to Javascript.");
    }else{
        if(!cdklanguages.includes(argv.cdk)){
            logerror("Supported AWS CDK Languages: javascript, typescript")
            shell.exit(1);
        }
    }
    
    if(!argv.react){
        logwarn("React language not provided via -react. Defaulting to Javascript.");
    }        
    
    if (!shell.which('npm')) {
        logerror('Sorry, you do need `npm` to use this tool');
        shell.exit(1);
    }else{
        const npm_v=shell.exec('npm --version', {silent:true}).stdout
        logsuccess(`Found NPM Version ${npm_v.replace('\n','')} installed`);
    }

    if (!shell.which('cdk')) {
       logwarn('AWS CDK CLI not found');
       const spinner = ora('Installing AWS CDK CLI globally...').start();
        try {
            await exec('npm install -g aws-cdk', {silent: true})
            spinner.stop();
            const cdk_v=shell.exec('cdk --version', {silent:true}).stdout
            logsuccess(`Installed AWS CDK Version ${cdk_v.replace('\n','')}...`);
        } catch (err) {
            logerror('Error installing AWS CDK CLI');
            console.log(err)
            shell.exit(1)
        }
    }else{
        const cdk_v=shell.exec('cdk --version', {silent:true}).stdout
        logsuccess(`Found AWS CDK Version ${cdk_v.replace('\n','')} installed`);
    }
}

const initcdk = async(cdk_lang) => {    
    const dir = (argv['_'][0])? `./${argv['_'][0]}/ccra-cdk-app`: './ccra-cdk-app'
    shell.mkdir('-p', dir);       
    const spinner = ora('Creating AWS CDK Application...').start();
    try {
        await exec(`cd ${dir} && cdk init sample-app --language=${cdk_lang}`, {silent:true});
        spinner.stop();
        logsuccess('Initialized AWS CDK Application... ~/ccra-cdk-app');
        logsuccess("Cleaning up AWS CDK installation");
        shell.rm('-rf', `${dir}/.git`);
    } catch (err) {
        logerror('Error ininitializing AWS CDK');
        console.log(err);
        shell.exit(1)
    }
};

const initreact = async(react_lang) => {
    const dir = (argv['_'][0])? `./${argv['_'][0]}/ccra-react-app`: './ccra-react-app'
    const spinner = ora('Creating React [CRA] Application...').start();
    try {
        if(react_lang === 'javascript'){
            await exec(`npx create-react-app ${dir}`, { silent : true });
            spinner.stop();
            logsuccess(`Initialized React [CRA] application... ${dir}`);
        }else{
            await exec(`npx create-react-app ${dir} --template typescript`, { silent : true })
            spinner.stop();
            logsuccess('Initialized React [CRA] application... ~/ccra-react-app');
        }
        logsuccess("Cleaning up React app installation");
        shell.rm('-rf', `${dir}/.git`);
    } catch (err) {
        logerror('Error ininitializing React [CRA] application');
        console.log(err);
        shell.exit(1)
    }
}

const gitinit = async(cdk_lang) => {
    const npm_config = (cdk_lang === 'typescript')? npmconfigts:npmconfig;
    const dir = (argv['_'][0])? `${argv['_'][0]}/`:'./';
    try {
        if(argv['_'][0]){
            const dirc = argv['_'][0];
            await exec(`cd ${dirc} && git init --initial-branch=main`, { silent : true });            
        }else{
            await exec('git init --initial-branch=main', { silent : true });
        }        
        shell.ShellString(gitignore).toEnd(`${dir}.gitignore`);
        shell.ShellString(npm_config).toEnd(`${dir}package.json`);        
        shell.ShellString(readme).toEnd(`${dir}README.md`);
    } catch (err) {
        logerror('Error ininitializing Git');
        console.log(err);
        shell.exit(1)
    }
}

(async () => {
    loginfo("Creating AWS CDK and React App Scaffolding... hang tight!");
    const cdk_lang = argv.cdk || 'javascript';
    const react_lang = argv.cdk || 'javascript';
    await validate();
    await initcdk(cdk_lang);
    await initreact(react_lang);
    await gitinit(cdk_lang);
    logsuccess("Done!")
})()