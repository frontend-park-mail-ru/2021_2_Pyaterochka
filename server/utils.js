async function transformFile (file) {
    const jsxCompiled = await require('@babel/core').transformFileAsync(file, {
        plugins: [['@babel/plugin-transform-react-jsx', {
            runtime: 'automatic',
            importSource: '@'
        }]]
    });

    return jsxCompiled.code.replace(/from "@\/jsx-runtime"/g, "from '/src/modules/jsx.js'");
}

module.exports.transformFile = transformFile;
