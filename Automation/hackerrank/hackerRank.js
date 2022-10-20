const puppeteer=require("puppeteer");

let email="";
let password="";
let {answer}=require("./code");
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
    // console.log(linkArr);
    //question solve krna h
                                  //link to the question to besolved,idx of the linkArr
    let questionWillWbeSolvedPromise=questionSolver(linkArr[0],0);
    for(let i=0;i<linkArr.length;i++){
        questionWillWbeSolvedPromise=questionWillWbeSolvedPromise.then(function(){
            return questionSolver(linkArr[i],i);
        })
        // a=10;
        // a=a+1;
    }
    return questionWillWbeSolvedPromise;

})
.then(function(){
    console.log("question is solved");
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
function questionSolver(url, idx) {
    return new Promise(function (resolve, reject) {
      let fullLink = `https://www.hackerrank.com${url}`;
      let goToQuesPagePromise = cTab.goto(fullLink);
      goToQuesPagePromise
        .then(function () {
          console.log("question opened");
          //tick the custom input box mark
          let waitForCheckBoxAndClickPromise = waitAndClick(".checkbox-input");
          return waitForCheckBoxAndClickPromise;
        })
        .then(function () {
          //select the box where code will be typed
          let waitForTextBoxPromise = cTab.waitForSelector(".custominput");
          return waitForTextBoxPromise;
        })
        .then(function () {
          let codeWillBeTypedPromise = cTab.type(".custominput", answer[idx], {
            delay: 100,
          });
          return codeWillBeTypedPromise;
        })
        .then(function () {
          //control key is pressed promise
          let controlPressedPromise = cTab.keyboard.down("Control");
          return controlPressedPromise;
        })
        .then(function () {
          let aKeyPressedPromise = cTab.keyboard.press("a");
          return aKeyPressedPromise;
        })
        .then(function () {
          let xKeyPressedPromise = cTab.keyboard.press("x");
          return xKeyPressedPromise;
        })
        .then(function () {
          let ctrlIsReleasedPromise = cTab.keyboard.up("Control");
          return ctrlIsReleasedPromise;
        })
        .then(function () {
          //select the editor promise
          let cursorOnEditorPromise = cTab.click(
            ".monaco-editor.no-user-select.vs"
          );
          return cursorOnEditorPromise;
        })
        .then(function () {
          //control key is pressed promise
          let controlPressedPromise = cTab.keyboard.down("Control");
          return controlPressedPromise;
        })
        .then(function () {
          let aKeyPressedPromise = cTab.keyboard.press("A");
          return aKeyPressedPromise;
        })
        .then(function () {
          let vKeyPressedPromise = cTab.keyboard.press("V");
          return vKeyPressedPromise;
        })
        .then(function () {
          let controlDownPromise = cTab.keyboard.up("Control");
          return controlDownPromise;
        })
        .then(function () {
          let submitButtonClickedPromise = cTab.click(".hr-monaco-submit");
          return submitButtonClickedPromise;
        })
        .then(function () {
          console.log("code submitted successfully");
          resolve();
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }