"use strict";

const assert = require('assert');
const db_mgr = require('../db_manager');
const fs = require('fs');

const db_path = db_mgr.vault_db_file;

// describe('Initialize', () => {
//     before(() => {
//         if (fs.existsSync(db_path)){
//             console.log("deleting db");
//             fs.unlinkSync(db_path);
//         }
//     });

//     it(`should have a db file named ${db_path}`, async () => {
//         await db_mgr.initDb();
//         assert.equal(fs.existsSync(db_path), true);
//     });
    
// });

describe('Get DB Data', () => {
    it(`should have 6 entries in the network table `, async () => {
        let entries = await db_mgr.selectAllFromTable('network');
        assert.equal(entries.length,6);
        console.log(entries);
    });

    
});