module.exports = function registration(db){

    let errMsg = '';

    async function addReg(regNum){
        
        let regex =  /.[A-Z]\s{1}\d{3}([-/.])\d{3}/; 
        
        let regNumber = await db.manyOrNone('SELECT registration_num From Registration where registration_num = $1',[regNum])
       
        if (regNumber.length == 0 && regNum && regex.test(regNum)){
            let results = await db.none("INSERT INTO Registration (registration_num, town_id) VALUES ($1,(SELECT Towns.id FROM Towns WHERE town_name = SUBSTRING($1,1,2)));",[regNum])
        }
        else if(!regNumber.length == 0){
            errMsg = "You have already added the registration number"
        }
        else if(regex.test(regNum) == false && regNum){
            errMsg = "Please enter the correct format of registration number"
        }
        else if(regNum == ''){
            errMsg = "Please add registration number"
        }
    }
    
    async function errorMsg(){
        return errMsg;
    }

    async function displayReg(){
            let results = await db.manyOrNone('SELECT Distinct registration_num FROM Registration');
            // console.log(results);
            return results
            // if display not true print error message
        }

        async function deleteReg(){
            let results = await db.none('DELETE FROM Registration')

                return errMsg = "You have deleted all registration numbers"
        
        }

        async function filterReg(reg_code){
            let results;
            if(reg_code){

                 results = await db.manyOrNone('SELECT registration_num FROM Registration where town_id = (Select id from Towns where town_name = $1)',[reg_code])
            }
            else if(reg_code == ""){

                 results =  await db.manyOrNone('SELECT registration_num FROM Registration')
            }
            return results
        }



    return{
        addReg,
        displayReg,
        deleteReg,
        filterReg,
        errorMsg
    }
}