import juice from 'juice';
import fs from 'fs';
import jsdom from 'jsdom';
import { exit } from 'process';
const { JSDOM } = jsdom;

console.log(process.argv);

if (process.argv.length <= 2) process.exit(0);

const filepath = process.argv[2].replace(/\\/g, "/");

if (fs.lstatSync(filepath).isDirectory()) {
    fs.readdir(filepath, (err, files) => {
        files.forEach(file => {
            run(filepath + "/" + file);
        });
    });
} else {
    run(filename);
}

function run(filepath, target = "desti") {
    console.log(filepath);
    const source = fs.readFileSync(filepath, 'utf-8');

    let juiced = juice.juiceResources(source, {}, (err, juiced) => {
        const dom = new JSDOM(juiced);
        console.log(dom.window.document.body.innerHTML); // "Hello world"
        let index = filepath.lastIndexOf("/");
        let filename = filepath.substr(index);
        console.log(filename);
        fs.writeFileSync(target + `/` + filename, dom.window.document.body.innerHTML);
    });
}



