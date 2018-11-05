const fs = require('fs');

function readdirAsync(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, function (err, files) {
            if(err) return reject(err);
            resolve(files);
        });
    });
}

async function readfiles(path) {
    let result = await readdirAsync(path);
    console.log(result);
};

readfiles('./memos');
