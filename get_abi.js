const axios = require('axios');
const fs = require('fs');
const delay = require('delay');
//polygonscan api key https://polygonscan.com/
const api_key = "TFG6YGW1CPYSXZANBKK76JDUGDTGC1ERXS";

fs.readFile('./polygon_vaults.json', 'utf8', process_abi);

async function process_abi(err, data){
  vaults = JSON.parse(data)
  for (var vault in vaults){
    console.log(vault)
    var address = vaults[vault];
    get_abi(address,vault);
    await delay(1000);
  }
}

function get_abi(address,vault) {
  axios.get(`https://api.polygonscan.com/api?module=contract&action=getabi&address=${address}&apikey=${api_key}`)
      .then(res => {
        fs.writeFile(`./vault_abi/polygon_${vault}.json`, res.data.result, 'utf8', (err) => {
          if (err) {
              console.log(`Error writing file: ${err}`);
          } else {
              console.log(`${vault} abi is written successfully!`);
          }
        });
      })
      .catch(err => {
        console.log(`error: ${err}`);
      });
    }

//url = ;


