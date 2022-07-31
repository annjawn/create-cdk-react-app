var shell = require('shelljs');

function exec(command, opts={}) {
    return new Promise((resolve, reject) => shell.exec(command, opts, (code, value, error) => {        
        if (code !== 0) {
            return reject(error)
        }
        resolve(value)
    }));
}

module.exports = {
    shell,
    exec
}