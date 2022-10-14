const { Cheerio } = require("cheerio");
const request=require("request");
// cheerio
// cheerio parses HTML and it traverses the html so that data can be manipulated according to user's needs
const cheerio=require("cheerio");





request("https://www.worldometers.info/coronavirus/",cb);

function cb(err,res,body){
    if(err){
        console.log("error",err);
    }
    else{
        handleHtml(body);
    }
    // console.log(res);
    // console.log(body);

    //extract krke data html se
}
function handleHtml(html){

    let selectTool=cheerio.load(html);
    let coronaStats=selectTool(".maincounter-number");
    // console.log(coronaStats.text());

    let totalCases=selectTool(coronaStats[0]).text();
    console.log("Total cases ->"+totalCases);

    let totalDeaths=selectTool(coronaStats[1]).text();
    console.log("Total Deaths ->"+totalDeaths);

    let totalRecover=selectTool(coronaStats[2]).text();
    console.log("Total recovered ->"+totalRecover);
}
