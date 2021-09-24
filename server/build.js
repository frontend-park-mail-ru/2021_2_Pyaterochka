
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

let counterAll = 0;
let counterDone = 0;
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
                if (filename.endsWith('.jsx')) {
                    counterAll++;
                    const code = await utils.transformFile(filename);
                    fs.writeFile(filename, code, (err) => {
                        if (err) throw err;
                        counterDone++;
                        console.log(`Transformed ${counterDone}/${counterAll}`);
                    });
                }
            });
        });
    });
}
