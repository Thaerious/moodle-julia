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

function flushCode(ele){
    let text = ele.innerHTML;
    let split = text.split("\n");

    let i = 0;
    while (split[i].trim() === "" && i < split.length) i++;

    let ws = split[i].search(/[^ ]/);

    for (let i in split){
        split[i] = split[i].substring(ws);
    }
    ele.innerHTML = split.join("\n");
}

function run(filepath, target = "dest") {
    const source = fs.readFileSync(filepath, 'utf-8');

    let juiced = juice.juiceFile(filepath, {}, (err, juiced) => {
        const dom = new JSDOM(juiced);

        dom.window.document.querySelectorAll("[flush]").forEach((ele)=>{
            console.log(ele.innerHTML);
            flushCode(ele);
            console.log(ele.innerHTML);
        });

        let index = filepath.lastIndexOf("/");
        let filename = filepath.substr(index);
        let dest = target + filename;
        fs.writeFileSync(dest, dom.window.document.body.innerHTML);
        console.log(filepath + " => " + dest);
    });
}



