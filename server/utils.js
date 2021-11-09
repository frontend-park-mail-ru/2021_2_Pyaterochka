const fs = require('fs');

async function transformFile (file) {
    const jsxCompiled = await require('@babel/core').transformFileAsync(file, {
        plugins: [['@babel/plugin-transform-react-jsx', {
            runtime: 'automatic',
            importSource: '@'
        }]]
    });

    return jsxCompiled.code.replace(
        /from "@\/jsx-runtime"/g, "from '/src/modules/jsx'"
    );
}

async function transformFileJS (file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, content) => {
            if (err) {
                reject(err);
            }

            resolve(transformJS(content));
        });
    });
}

function transformJS (data) {
    return String(data).replace(/.jsx'/g, '.js\'').replace(/.jsx"/g, '.js"');
}

module.exports.transformFile = transformFile;
module.exports.transformFileJS = transformFileJS;
module.exports.transformJS = transformJS;
