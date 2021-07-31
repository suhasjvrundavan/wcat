#!/usr/bin/env node

let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);
let fileArr = [];
let optionsArr = [];
let display = "";

for(let i = 0; i < inputArr.length; i++){
    let firstch = inputArr[i].charAt(0);
    if(firstch == "-"){
        optionsArr.push(inputArr[i]);
    }else{
        fileArr.push(inputArr[i]);
    }

}

let isBothpresent = optionsArr.includes("-n") && optionsArr.includes("-b");
let idxOfN, idxOfB;

if(isBothpresent){
    for(let i = 0; i < optionsArr.length; i++){
        if(optionsArr[i] == "-n"){
            idxOfN = i;
        }
        if(optionsArr[i] == "-b"){
            idxOfB = i;
        }
    }
}

for( let i = 0; i < fileArr.length; i++){
            let ifPresent = fs.existsSync(fileArr[i]);
    if( ifPresent == false){
        console.log("File doesn't exist");
        return;
    }
}

for(let i = 0; i < fileArr.length; i++){
    let content = fs.readFileSync(fileArr[i]);
    display += content+"\r\n";
}
let contentArr = display.split("\r\n");

let isSpresent = optionsArr.includes("-s");
if(isSpresent){
    
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }
        else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
    
let tempArr =[];
for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
}
 contentArr = tempArr;
    
}



if(idxOfN < idxOfB){
    let isNpresent  = optionsArr.includes("-n");
    
    if(isNpresent){
        for(let i = 0;i<contentArr.length;i++){
            contentArr[i] = `${i+1} ${contentArr[i]}`;
        }
        
    }
}


if(idxOfB < idxOfN){

    let isBpresent  = optionsArr.includes("-b");
    if(isBpresent == true){
        
        
        let counter = 1;
        for(let i = 0;i<contentArr.length;i++){
            if(contentArr[i] != ""){
                contentArr[i] = `${counter} ${contentArr[i]}`;
                counter++;
            }
        }
        
        
    }
}

console.log(contentArr.join("\n"));