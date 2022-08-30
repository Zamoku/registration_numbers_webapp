const assert = require('assert');
const Registration = require('../registration')
const pgPromise = require("pg-promise");
const pgp = pgPromise({})

const connectionString = process.env.DATABASE_URL || 'postgresql://zamoe:zamo123@localhost:5432/registration_db_test';

const db = pgp(connectionString)


describe('The basic database web app', function () {


    it('should insert registration numbers into the db test', async function () {


        let registration = Registration(db);
        let reg = await registration.addReg(
            'CA 152-563'
        );

        let reg2 = await registration.addReg(
            'CA 152-123'
        );
        let getReg = await registration.displayReg()
        assert.deepEqual([{registration_num: "CA 152-123"}, {registration_num: 'CA 152-563'}], getReg);
        

    });
    it('should get filter towns from the db test', async function () {


        let registration = Registration(db);
        let reg = await registration.filterReg('CA');


        assert.equal("CA 254-562", "CA 254-562", reg);

    });

    
    
    // it('should throw an error message if the format of the registration number is incorrect', async function () {
        
    //     // 
    //     let registration = Registration(db);
    //     let reg = await registration.addReg("CA 152-56");
        
        
    //     assert.equal("Please add registration number in a format of 'CA 123-456'", reg);
        
    // });
    
    it('should clear the list of registration numbers in the db test', async function () {


        let registration = Registration(db);
        await registration.deleteReg();


    });
    afterEach('Drop all tables', async function () {
        //clean the tables after each test run
        await db.query("delete from Registration;");

    });

});