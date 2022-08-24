module.exports = function registration(db){

        async function addReg(regNum){
            let reg = await db.any('INSERT INTO Registration (registration_num) VALUES ($1)',[regNum])
        }

        async function displayReg(){
            let results = await db.manyOrNone('SELECT registration_num FROM Registration');
            console.log(results)
            
            return results
        }
    return{
        addReg,
        displayReg
    }
}