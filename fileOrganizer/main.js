// entry point of my command line
let helpFunc=require("./commands/help");
// console.log(helpFunc.godha());
let inputArr=process.argv.slice(2);
let command = inputArr[0];
let path=inputArr[1];

switch(command){
    case"tree":
    //call tree function
    console.log("tree function called and executed succefully on path"+path);
    break;
    case"organise":
    console.log("organise function called and executed succefully on path"+path);
    break;
    case"help":
    helpFunc.help();
    // console.log("help function called and executed succefully on path");
    break;
    default:
    console.log("command not recognised :/");
    break;
}