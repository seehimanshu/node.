// // function yolo(){
// //     var a=10;
// //     function cb(){
// //         console.log("hello how are you");
// //     }
// //     setTimeout(cb,5000);
// //     console.log(a);
// // }
// // yolo();
// // let b=100;
// // console.log(b);

// const request =require("request");
// let url ="https://www.worldometers.info/coronavirus/"
// function yolo(){
//     var a=10;
//     function cb(err,res,body){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("hello how are you");
//             console.log("statuscode is ",res.statusCode);
//         }
//     }
//     request(url,cb);
//     console.log(a);
// }

// for(let i=1;i<=10;i++){
//     setTimeout(function(){
//         console.log(i);
//     },2000*i);
// }

// for(var i=1;i<=10;i++){
//     function outer(a){
//         setTimeout(function(){
//             console.log(a);
//         },2000*a);
//     }
//     outer(i);
// }

for(var i=1;i<=10;i++){
    function cb(a){
        console.log(a);
    };
    setTimeout(cb,2000*i,i);
}
