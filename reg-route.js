module.exports = function RegRoutes(reg){

    async function addRegNum(req, res){
        // reg_number = req.params.reg_number
        await reg.addReg(
            req.body.setReg
            )
        let regex =  /.[A-Z]\s{1}\d{3}([-/.])\d{3}/; 
        let regNo = req.body.setReg
         if (regNo == "" )  {
            req.flash('info', "Please add registration number") 
         } 
        else if (!regex.test(regNo))  {
            req.flash('info', "Please add registration number in a format of 'CA 123-456'") 
         } 
        res.redirect('/')
    }

    async function showReg(req, res){
        res.render('index',{

            // reg_number: req.params.reg_number,
            reg_number: await reg.displayReg()
        })
    }
    async function deleteAll(req, res){
        req.flash('success', 'You have deleted all registration numbers')
        await reg.deleteReg()

        res.redirect('/')
    }

    async function filterReg(req, res){
     
        res.render('index',{
            reg_number: await reg.filterReg(
                req.body.town
            )}
            )
    }
    
    return{
        addRegNum,
        showReg,
        deleteAll,
        filterReg
    }
}