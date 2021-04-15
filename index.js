import juice from 'juice';
import fs from 'fs';
import {JSDOM} from 'jsdom';

if (process.argv.length <= 2) process.exit(0);
let filepath = process.argv[2].replace(/\\/g, "/");
let dest = process.argv[3];
let watch = false;

let timeouts = {};

parse(process.argv);

function parse(args) {
    let i = 2;
    for (i = 2; i <= args.length - 3; i++) {
        switch (args[i]) {
            case "-w":
                watch = true;
                break;
        }
    }
    filepath = process.argv[i].replace(/\\/g, "/");
    dest = process.argv[i + 1];
}

console.log("input :" + filepath);
console.log("output :" + dest);

if (fs.lstatSync(filepath).isDirectory()) {
    fs.readdir(filepath, (err, files) => {
        files.forEach(file => {
            if (file.endsWith(".html")) {
                goFile(filepath + "/" + file);
            }
        });
    });
} else {
    if (filepath.endsWith(".html")) {
        goFile(filepath);
    }
}

function goFile(filepath){
    timeout(filepath);
    if (watch) {
        console.log("watching :" + filepath);

        fs.watch(filepath, (eventType, filename)=>{
            timeout(filepath);
        });
    }
}

function timeout(filepath){
    if (timeouts[filepath]) return;
    timeouts[filepath] = setTimeout(()=>run(filepath), 500);
}

function flushCode(ele) {
    let text = ele.innerHTML;
    let split = text.split("\n");

    let i = 0;
    while (i < split.length){
        if (split[i] !== undefined){
            if (split[i].trim() !== "") break;
        }
        i++;
    }

    if (i >= split.length) return;
    let ws = split[i].search(/[^ ]/);

    for (let i in split) {
        split[i] = split[i].substring(ws);
    }
    ele.innerHTML = split.join("\n");
}

function run(filepath, target = "dest") {
    delete timeouts[filepath];
    const source = fs.readFileSync(filepath, 'utf-8');
    let index = filepath.lastIndexOf("/");
    let filename = filepath.substr(index);
    let dest = target + filename;

    let juiced = juice.juiceFile(filepath, {}, (err, juiced) => {
        console.log(filepath + " => " + dest);
        const dom = new JSDOM(juiced);

        dom.window.document.querySelectorAll("[flush]").forEach((ele) => {
            flushCode(ele);
        });

        fs.writeFileSync(dest, dom.window.document.body.innerHTML);
    });
}



