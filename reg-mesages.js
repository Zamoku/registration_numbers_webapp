module.exports = function regFunction(){

    async function duplicateReg(){
        
    }

    let errMsg;
    async function sendErrorMsg(regNum){
        let regex =  /[A-Z]{1,3}\s{1}\d{3}(|\s|\S|-)\d{3}/;
    
         if(regex.test(regNum) == false){
            errMsg = "Please enter the correct format of registration number"
        }
        if(regNum == ''){
            errMsg = "Please add registration number"
        }
       
    }

    async function errorMsg(){
        return errMsg;
    }

    return{
        sendErrorMsg,
        duplicateReg,
        errorMsg

    }
}
