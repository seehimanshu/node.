const fs=require("fs");
const path=require("path");
let types={
    media: ["mp4","mkv","mp3"],
    archives:['zip','7z','rar','tar','gz','ar','iso',"xz"],
    documents:['docx','doc','pdf','xlsx','xls','odt','ods','odg','odf','txt','ps','tex'],
    app:['exe','dmg','pkg',"deb"],
    images:['png','jpg','jpeg']

}

function organize(srcPath){
    if(srcPath==undefined){
        // The process.cwd() method returns the current working directory of the Node.js process.
        srcPath=process.cwd();
        // console.log(srcPath);
    }
    // else{
        //  console.log(srcPath);
    // }
    let organizedFiles=path.join(srcPath,"organized_files");
    if(!fs.existsSync(organizedFiles)){
        fs.mkdirSync(organizedFiles);
    }
    else{
        console.log("folder already exists");
    }
}
organize();