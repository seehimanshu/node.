 const os=require("os");
//return the underline architechure
 let mySystemArch=os.arch();
 console.log(mySystemArch);

 //return information on the cpus
 let myCpuInfo=os.cpus();
//  console.log(myCpuInfo);

 //return the host name of the operating system as a string
 let hostname=os.hostname();
//  console.log(hostname);

 let networkInfo=os.networkInterfaces();
//  console.log(networkInfo);
console.log(os.release());//return the operating system as a string

console.log(os.platform());//return a string identifying the operating system platform
 
console.log(os.type());//return the operating system name

console.log(os.totalmem());//return the total amount of system memory in bytes as an integer

console.log((os.uptime()));//return the system uptime in number of seconds
let uptimeInMin=os.uptime()/3600;
console.log(uptimeInMin);
console.log(os.userInfo());//return information about the currently effective user