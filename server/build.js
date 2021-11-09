const fs = require('fs');
const utils = require('./utils');

const inFolder = './public';
const outFolder = './build';

if (fs.existsSync(outFolder)) {
    fs.rmSync(outFolder, { recursive: true });
}

require('ncp').ncp(inFolder, outFolder, () => {
    walker(outFolder);
});

function walker (path) {
    fs.readdir(path, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            const filename = `${path}/${file}`;
            fs.lstat(filename, async (err, stats) => {
                if (err) throw err;
                if (stats.isDirectory()) {
                    return walker(filename);
                }
                let code = null;
                if (filename.endsWith('.jsx')) {
                    code = await utils.transformFile(filename);
                    code = utils.transformJS(code);
                }
                if (filename.endsWith('.js')) {
                    code = await utils.transformFileJS(filename);
                }

                if (code) {
                    fs.writeFile(filename.replace('.jsx', '.js'), code, (err) => {
                        if (err) throw err;
                    });
                }
            });
        });
    });
}
