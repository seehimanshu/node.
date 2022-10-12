 // 1) node wcat.js filepath => display the contents of a file in terminal
 // 2) node wcat.js filepath filepath2 filepath3 =>displays the content of all files in terminal in concatinative form in given order
 // node wcat.js f1.txt
 // node wcat.js f1.txt f2.txt f3.txt
 const fs=require("fs")
 let inputArr=process.argv.slice(2);
//  console.log(input);

let filesArr=[];
//placed files path in filesarr
for(let i=0;i<inputArr.length;i++){
    filesArr.push(inputArr[i]);
}
console.log("file to be read are"+filesArr);

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