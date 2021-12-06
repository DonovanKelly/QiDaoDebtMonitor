const sqlite3 = require('sqlite3').verbose();
const Database = require('better-sqlite3');

const fs = require('fs');

const vault_db_file = 'vault_debt.db'

async function makeDb(){
    let db = new sqlite3.Database(vault_db_file, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to vault database');
      });
    
    db.serialize(()=> {
        db.run(`CREATE TABLE network (
                    network_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    network_name VARCHAR(256) NOT NULL UNIQUE
                    );`)
            .run(`INSERT INTO network (network_name) 
                    VALUES
                        ('Polygon'),
                        ('Fantom'),
                        ('Avalanche'),
                        ('Moonriver'),
                        ('Cronos'),
                        ('Arbitrum');`)
            .run(`CREATE TABLE vaults (
                    network_id INTEGER NOT NULL,
                    vault_address UNSIGNED BIG INT NOT NULL,
                    vault_id INTEGER NOT NULL,
                    vault_debt INTEGER NOT NULL,
                    vault_collateral INTEGER NOT NULL,
                    last_updated TIMESTAMP
                    DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(network_id) REFERENCES network(network_id)
                );`)
            .run(`CREATE TABLE vault_contract (
                    vault_address UNSIGNED BIG INT PRIMARY KEY,
                    network_id INTEGER NOT NULL,
                    numb_vaults INTEGER NOT NULL,
                    debt_ceil INTEGER NOT NULL,
                    last_updated TIMESTAMP
                    DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(network_id) REFERENCES network(network_id)
            );`);
    });
    
    db.close();

}

async function selectAllFromTable(table) {
    const db = new Database(vault_db_file, { fileMustExist: true });

    const selected = db.prepare(`SELECT * FROM ${table}`).all();
    db.close();
    // await db.each(`SELECT * FROM ${table}`, (err,rows) => {

    //     console.log(rows);
    //     // rows.forEach((res) => {
    //     //     //selected.push(res);
    //     //     console.log(res);
    //     // });
    //     // // rows.then((res) => {

    //     // //     selected = res;
    //     // // });
    // });
    // db.close();
    return selected;
}

async function initDb(){
    if (!fs.existsSync(vault_db_file)){
        console.log("creating new db");
        await makeDb();
    }
    
}

function insertVaults(vault_data){
    let db = new sqlite3.Database(vault_db_file, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to vault database');
    });
    var vault_strs = [];

    // for(var data in vault_data){
    //     let str_data = `(${data['network_id']}, ${data['vault_address']}, ${data['vault_id']}, ${data['vault_debt']}, ${data['vault_collateral']})`
    //     vault_strs
    // }
    // let insert = `INSERT INTO vaults(network_id, vault_address, vault_id, vault_debt, vault_collateral) VALUES (${});`

    db.close();
}

module.exports.selectAllFromTable = selectAllFromTable;
module.exports.vault_db_file = vault_db_file;
module.exports.initDb = initDb;

module.exports.insertVaults = insertVaults;



