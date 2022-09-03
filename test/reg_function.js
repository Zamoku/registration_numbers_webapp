const assert = require('assert');
const Registration = require('../reg-mesages');

describe('greetings function', function () {

it('should throw an error message if the format of the registration number is incorrect', async function () {
        
    let registration = Registration();
    let reg = await registration.sendErrorMsg("CA 152-56");
    
    let getReg = await registration.errorMsg()
    assert.equal("Please enter the correct format of registration number", getReg);
    
});

it('should throw an error message if nothing is entered', async function () {
    
    
    let registration = Registration();
    let reg = await registration.sendErrorMsg('');
    
    let getReg = await registration.errorMsg()
    assert.equal("Please add registration number", getReg);
    
   });

});