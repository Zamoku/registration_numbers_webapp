module.exports = function registration(db){

    async function addReg(regNum){
        
        let regex =  /.[A-Z]\s{1}\d{3}([-/.])\d{3}/; 
           
        if (regNum && regex.test(regNum)){
                let results = await db.none("INSERT INTO Registration (registration_num, town_id) VALUES ($1,(SELECT Towns.id FROM Towns WHERE town_name = SUBSTRING($1,1,2)));",[regNum])
            }
            
        }
        
        async function displayReg(){
            let results = await db.manyOrNone('SELECT Distinct registration_num FROM Registration');
            // console.log(results);
            return results
            // if display not true print error message
        }

        async function deleteReg(){
            let results = await db.none('DELETE FROM Registration')
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

        async function checkDuplicates(num){
            // if( await !displayReg()){
            //     return 
            // }
            
        }

      

    return{
        addReg,
        displayReg,
        deleteReg,
        filterReg,
        checkDuplicates
    }
}