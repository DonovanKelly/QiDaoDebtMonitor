const Web3 = require('web3');
const fs = require('fs');

async function getVaultDebtCeiling(net, vault){
  providers = JSON.parse(fs.readFileSync('./net_providers/providers.json'));
  const w3 = new Web3(providers[net]);
  let vault_addresses = JSON.parse(fs.readFileSync(`./vault_address/${net}_vaults.json`));
  let vault_adr = vault_addresses[vault];
  //.log(`address: ${address}`);
  let mai_contract_data = JSON.parse(fs.readFileSync(`./mai_abi/${net}_mai_abi.json`, 'utf8'));
  let mai_addr = mai_contract_data['address'];
  let mai_abi = mai_contract_data['abi'];
  //console.log(`abi: ${JSON.stringify(abi)}`);
  let contract = new w3.eth.Contract(mai_abi, mai_addr);
  var vaultDebtCeiling = await contract.methods.balanceOf(vault_adr).call();
  console.log(vaultDebtCeiling)
  vaultDebtCeiling = parseInt(vaultDebtCeiling) * 10**(-18);
  console.log(`debt ceiling: ${vaultDebtCeiling}`);
  return vaultDebtCeiling;
}

async function getAllDebtCeilings(){
  
}

module.exports.getVaultDebtCeiling = getVaultDebtCeiling;