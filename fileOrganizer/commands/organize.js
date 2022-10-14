const fs=require("fs");
const path=require("path");
let types={
    media: ["mp4","mkv","mp3","mov"],
    archives:['zip','7z','rar','tar','gz','ar','iso',"xz"],
    documents:['docx','doc','pdf','xlsx','xls','odt','ods','odg','odf','txt','ps','tex','csv'],
    app:['exe','dmg','pkg',"deb","apk"],
    images:['png','jpg','jpeg']

}

function organize(srcPath){
    //1.check if srcPath is present
    if(srcPath==undefined){
        // The process.cwd() method returns the current working directory of the Node.js process.
        srcPath=process.cwd();
        // console.log(srcPath);
    }
    //2. to create a directory ->organized_files
    // let organizedFiles =srcPath +"/"+"organized_files";
    let organizedFiles=path.join(srcPath,"organized_files");
    console.log("organized files folder path is",organizedFiles);
    if(!fs.existsSync(organizedFiles)){
        //organizedFiles name ka folder exist nhi krta to ek folder bana do warna rehne do
        fs.mkdirSync(organizedFiles);
    }
    else console.log("folder already exists");

        //3.scan the entire srcPath(downloads folder in this case)
    let allFiles =fs.readdirSync(srcPath);
    // console.log(allFiles);


        //4.traverse over all the files and classify them on the basis of their extension(.pdf,.mp3)
    for(let i=0;i<allFiles.length;i++){
        // let ext=allFiles[i].split(".")[1];
        
        let fullPathOfFile=path.join(srcPath,allFiles[i]);
        console.log(fullPathOfFile);
        //1.check if it is a file or folder
        //lstatSync gives the information regarding the link provided
        let isThisFile=fs.lstatSync(fullPathOfFile).isFile();//true ->if file h toh or false->agr folder h
        console.log(allFiles[i]+"is"+isThisFile);
        if(isThisFile){
            //1.1 get ext name
            let ext=path.extname(allFiles[i]).split(".")[1];//ext name returns the extension of the file
            // console.log(ext);
            // 1.2 get folder name from extension
            let folderName=getFolderName(ext);
            // 1.3 copy from src folder (srcPath) and paste in dest folder(folder_name eg:-documents,media etc)
            copyFileToDest(srcPath,fullPathOfFile,folderName);
        }
    }
}

function getFolderName(ext){

    for(let key in types){
        for(let i=0;i<types[key].length;i++){
            if(types[key][i]==ext){
                return key;
            }
        }
    }
    return "miscellaneous";
}
function copyFileToDest(srcPath,fullPathOfFile,folderName){
    //1. folderName ka path banana h
    let destFolderPath=path.join(srcPath,"organized_files",folderName);//..../downloads/organized_files/archives
    //consloe.log(destFolderPath);
    //2. check folder if exists,if it does not, then make folder

    if(!fs.existsSync(destFolderPath)){
        fs.mkdirSync(destFolderPath);
    }
    // 3.copy file from src folder to dest folder

    //return the last portion of a path
    let fileName =path.basename(fullPathOfFile);//abc.zip
    let destFileName=path.join(destFolderPath,fileName);
    // src    dest
    fs.copyFileSync(fullPathOfFile,destFileName);// file name esliy dena padta h kyuki copyfunction file k andar ka content copy krta h naki puri file


}


// let srcPath="/Users/himanshusengar/Desktop/Fjp-5/Node/fileOrganizer/downloads"
// organize(srcPath);

module.exports={
    organize:organize
}
