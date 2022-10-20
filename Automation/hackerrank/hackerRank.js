const puppeteer=require("puppeteer");

let email="xikibid862@robhung.com";
let password="pepcoding123";

let cTab;
let browserOpenPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
});

browserOpenPromise
.then(function (browser){
    console.log("browser is open");

    //An array of all open pages inside the browser.
    // returns an array with all the pages in all browser contexts
    let allTabsPromise=browser.pages();
    return allTabsPromise;
})
.then(function (allTabsArr){
    cTab=allTabsArr[0];
    console.log("new tab");
    //URL to navigate page to
    let visitingLoginPagePromise=cTab.goto("https://www.hackerrank.com/auth/login")
    return visitingLoginPagePromise;
})
.then(function (){
    console.log("Hackerrank login page opened");
    let emailWillBeTypedPromise=cTab.type("input[name='username']",email);
    return emailWillBeTypedPromise;
})
.then(function(){
    console.log("email is typed");
    let pswdwillBeLoggedInPromise=cTab.type("input[type='password']",password);
    return pswdwillBeLoggedInPromise;
})
.then(function(){
    console.log("password has been typed");
    let willBeLoggedInPromise=cTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return willBeLoggedInPromise;
})
.then(function(){
    console.log("logged into hackerrank succesfully");
    // waitAndClick will wait for the selector to load, and then click on the node
    let algorithmTabWillBeOpenedPromise=waitAndClick("div[data-automation='algorithms']");
    return algorithmTabWillBeOpenedPromise;
})
.then(function(){
    console.log("algorithm page is opened");
    let allQuesPromise=cTab.waitForSelector("a[data-analytics='ChallengeListChallengeName']");
    return allQuesPromise;
})
.then(function(){
    function getAllQuesLinks(){
        let allElemArr=document.querySelectorAll("a[data-analytics='ChallengeListChallengeName']");
        let linkArr=[];
        for(let i=0;i<allElemArr.length;i++){
            linkArr.push(allElemArr[i].getAttribute('href'));

        }
        return linkArr;

    }
    let linkArrPromise=cTab.evaluate(getAllQuesLinks);
    return linkArrPromise;
})
.then(function(linkArr){
    console.log("links to all ques received");
    console.log(linkArr);
})
.catch(function(err){
    console.log(err);
});

function waitAndClick(algoBtn){
    let waitClickPromise=new Promise(function(resolve,reject){
        let waitForSelectorPromise=cTab.waitForSelector(algoBtn);
        waitForSelectorPromise
        .then(function(){
            console.log("algoBtn is found");
            let clickPromise=cTab.click(algoBtn);
            return clickPromise;
        })
        .then(function(){
            console.log("algoBtn is clicked");
            resolve();
        })
        .catch(function(err){
            console.log(err);
        })
    });
    return waitClickPromise;
}