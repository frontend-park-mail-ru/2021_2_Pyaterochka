const fs = require('fs');
const crypto = require('crypto');

const mustCache = [
    '',
    'imgs/',
    'styles/',
    'scripts/index.compiled.js'
];

const baseDir = './public/';

async function walker (path) {
    return new Promise((resolve) => {
        fs.readdir(baseDir + path, async (err, files) => {
            if (err) throw err;
            const res = await Promise.all(files.map(async (file) => {
                const filename = `${path}/${file}`;
                const res = await new Promise((resolve) => {
                    fs.lstat(baseDir + filename, async (err, stats) => {
                        if (err) throw err;
                        if (stats.isDirectory()) {
                            resolve(await walker(filename));
                        }

                        resolve([filename]);
                    });
                });
                return res;
            }));

            resolve(res.reduce((acc, el) => [...acc, ...el], []));
        });
    });
}

async function generateSW () {
    const filesMustCache = [];
    await Promise.all(mustCache.map(async (file) => {
        if (file.endsWith('/')) {
            const res = await walker(file.substr(0, file.length - 1));
            filesMustCache.push(...res);
        } else {
            filesMustCache.push(file);
        }
    }));

    fs.readFile('./server/sw/sw.js', (err, buffer) => {
        if (err) {
            throw err;
        }

        const hash = crypto.createHash('sha1').update((new Date()).toISOString()).digest('hex');

        let result = '';
        result += `const cacheName = '${hash}';`;

        result += `const contentToCache = [${filesMustCache.map(file => `'/${file}'`).join(',')
        }];`;

        result += String(buffer);

        fs.writeFile(baseDir + 'sw.js', result, (err) => {
            if (err) {
                throw err;
            }
            console.log('Service worker generated');
        });
    });
}

generateSW();
