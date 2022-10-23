const fs=require("fs");

console.log("before");
//syncronous working
//let data=readFileSync("f1.txt");
// console.log(data+"");


//async working
// fs.readFile("f1.txt",cb);
// function cb(err,data){
//     if(err){
//         co
//         console.log(err);
//     }
//     else console.log(data+"");
// }

//promises working
let promiseThatFileWillBeRead= fs.promises.readFile("f1.txt");
console.log(promiseThatFileWillBeRead);
promiseThatFileWillBeRead.then(printData);
promiseThatFileWillBeRead.catch(printError);
// promiseThatFileWillBeRead.then(function printData(data){
//     console.log("promise is fullfilled");
//     console.log(data+"");
// });


console.log("after");

function printData(data){
    console.log("promise is fullfilled");
    console.log(data+"");
}

function printError(err){
    console.log(err);
}