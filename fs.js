// fs->file sysrem module
const fs=require("fs");
const abc=require("../Git-demo/javascript/temp")
console.log(abc);
//appendFileSync appends data into a file ,if file is not present it creates the files and then appends the data
let res=fs.appendFileSync("f1.txt","hello i am f1 file");
fs.appendFileSync("f1.txt","\nyou guys are smart");
console.log(res);
// let data=fs.readFileSync("f1.txt");
// console.log(data+"");
let data =fs.readFileSync("f1.txt","utf-8");
console.log(data);
// console.log(typeof data);
