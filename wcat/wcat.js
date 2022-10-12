 // 1) node wcat.js filepath => display the contents of a file in terminal
 // 2) node wcat.js filepath filepath2 filepath3 =>displays the content of all files in terminal in concatinative form in given order
 // 3) node wcat.js -n file1 file2=>1.file1,2.file2
 // node wcat.js f1.txt
 // node wcat.js f1.txt f2.txt f3.txt
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
    let tempArr=[];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i]);
        }
    }
    console.log(tempArr);
}