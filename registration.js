module.exports = function registration(db){


    async function addReg(regNum){
        let errMsg;

        let regex =  /[A-Z]{1,3}\s{1}\d{3}(|\s|\S|-)\d{3}/; 
        
        const regNumber = await db.manyOrNone('SELECT registration_num From Registration where registration_num = $1',[regNum])

         if (regNumber.length == 0 && regex.test(regNum)){
            let results = await db.none("INSERT INTO Registration (registration_num, town_id) VALUES ($1,(SELECT Towns.id FROM Towns WHERE town_name = SUBSTRING($1,1,2)));",[regNum])
            errMsg = ""
        }
        
          if(regNumber.length > 0){

            errMsg = "You have already added the registration number"
        }

        return regNumber
    }
    

    async function displayReg(){
            let results = await db.manyOrNone('SELECT Distinct registration_num FROM Registration');

            return results
        }

        async function deleteReg(){

            let results = await db.none('DELETE FROM Registration')
            
           
        }

        async function filterReg(reg_code){

                let results = await db.manyOrNone('SELECT registration_num FROM Registration where town_id = (Select id from Towns where town_name = $1)',[reg_code])
            
                if(results.length > 0){
                    errMsg = ''
                }
               
                if(results.length == 0){
                    errMsg = "No registration numbers for the selected town"
                } 
                if(reg_code == ""){

                 results =  await db.manyOrNone('SELECT registration_num FROM Registration')
                 errMsg = ''
            }
            
             return results  
        }



    return{
        addReg,
        displayReg,
        deleteReg,
        filterReg
    }
}