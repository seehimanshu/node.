 const os=require("os");
//return the underline architechure
 let mySystemArch=os.arch();
 console.log(mySystemArch);

 //return information on the cpus
 let myCpuInfo=os.cpus();
 console.log(myCpuInfo);

 //return the host name of the operating system as a string
 let hostname=os.hostname();
 console.log(hostname);