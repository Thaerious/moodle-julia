import juice from 'juice';
import fs from 'fs';
import {JSDOM} from 'jsdom';

if (process.argv.length <= 2) process.exit(0);

const filepath = process.argv[2].replace(/\\/g, "/");
const dest = process.argv[3];

if (fs.lstatSync(filepath).isDirectory()) {
    fs.readdir(filepath, (err, files) => {
        files.forEach(file => {
            if (file.endsWith(".html")) run(filepath + "/" + file);
        });
    });
} else {
    run(filepath);
}

function run(filepath, target = "dest") {
    console.log(filepath);
    const source = fs.readFileSync(filepath, 'utf-8');

    let juiced = juice.juiceFile(filepath, {}, (err, juiced) => {
        const dom = new JSDOM(juiced);        
        let index = filepath.lastIndexOf("/");
        let filename = filepath.substr(index);
        fs.writeFileSync(target + `/` + filename, dom.window.document.body.innerHTML);
    });
}



