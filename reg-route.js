module.exports = function RegRoutes(reg){

    async function addRegNum(req, res){
        await reg.addReg(
            req.body.setReg
        )
        res.redirect('/')
    }

    async function showReg(req, res){
        res.render('index',{
            reg_number: await reg.displayReg()
        })
    }

    
    return{
        addRegNum,
        showReg
    }
}