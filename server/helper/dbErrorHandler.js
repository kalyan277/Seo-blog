'use strict';

const uniqueMessage =error =>{
    let output;
    try {
        let fieldName = error.message.substring(error.message.lastIndexOf('.$') +2 ,error.message.lastIndexOf('_1'));
        output=fieldName.charAt(0).toUpperCase() + fieldName.slice(1)+'already exists';
    } catch (error) {
      output='Unique Field Already Exists'  
    }
}

exports.errorHandler =error=>{
    let message='';
    if(error.code){
       // console.log(error.code)
        switch (error.code) {
            case 11000:
                message='Category Already Exist';
                break;
             case 11001:
                 message=uniqueMessage(error)   
                break;
        
            default:
                message='Something Went Wrong';
        }
    }else{
        for(let errorName in error.errorors){
            if(error.errorors[errorName].message) message = error.errorors[errorName].message;
        }
    }
    console.log(message)
    return message;
}