const fs = require('fs');

const handle = {}

handle.getTemplate = (filePath)=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath,"utf-8",(err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}
module.exports = handle;
