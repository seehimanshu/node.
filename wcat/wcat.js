 // 1) node wcat.js filepath => display the contents of a file in terminal
 // 2) node wcat.js filepath filepath2 filepath3 =>displays the content of all files in terminal in concatinative form in given order
 // 3) node wcat.js -n file1 file2=>1.file1,2.file2
 // node wcat.js f1.txt
 // node wcat.js f1.txt f2.txt f3.txt
 const { count } = require("console");
const fs=require("fs")
 let inputArr=process.argv.slice(2);
 console.log(inputArr);


let filesArr=[];
//placed files path in filesarr
let optionsArr=[];
for(let i=0;i<inputArr.length;i++){
    let firstChar=inputArr[i].charAt(0);
    if(firstChar=='-'){
        optionsArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
    
}
// console.log("file to be read are "+filesArr);

//check if all the files are present
for(let i=0;i<filesArr.length;i++)
{

    let doesExits=fs.existsSync(filesArr[i]);
    if(!doesExits){
        console.log("File does not exits");
        return;
    }
    
}

// content read and appending starts

let content ="";
for(let i=0;i<filesArr.length;i++){
    let fileContent =fs.readFileSync(filesArr[i]);
    content +=fileContent+"\n";
}
console.log(content);

let contentArr=content.split("\n");
console.log(contentArr);

//check if-> -s is present or not
let tempArr=[];
let isSpresent=optionsArr.includes("-s");
if(isSpresent){
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    console.table(contentArr);
    
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i]);
        }
    }
    //console.log(tempArr);
    contentArr=tempArr;
}
let finalOption="";
let indexOfN=optionsArr.indexOf("-n");
let indexOfB=optionsArr.indexOf("-b");
//if -n or -b is not found ,-1 will be returned

//if both are present
if(indexOfN!=-1&&indexOfB!=-1){
    if(indexOfN<indexOfB){
        finalOption="-n";
    }
    else{
        finalOption="-b";
    }
}

//either -n or -b is present
else{
    if(indexOfN!=-1){
        finalOption='-n';
    }
    else if(indexOfB!=-1){
        finalOption="-b";
    }
}

//calling of functions by evaluating finalOption
if(finalOption=="-n"){
    modifyContentByN();
}
else if(finalOption=="-b"){
    modifyContentByB();
}

function modifyContentByN(){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=(i+1) +")"+ contentArr[i];
    }
}
function modifyContentByB(){
    let count=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i]=count+")"+contentArr[i];
            count++;
        }
    }
}
console.log(contentArr);