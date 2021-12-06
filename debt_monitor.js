const Web3 = require('web3');
const fs = require('fs');

const polygon_provider = "https://rpc-mainnet.maticvigil.com/";
const w3 = new Web3(polygon_provider);

const vaults = JSON.parse(fs.readFileSync('./vault_address/polygon_vaults.json', 'utf8'));

const net = 'polygon';

function getVaultData(net, vault){
  var vault_json = new Object();
  var address;
  var abi;
  var contract;
  var vaultCount;
  var vaultDebtCeiling;
  var currentDebt;
  
  console.log(`vault: ${vault}`)
  let address = vaults[vault];
  let abi = JSON.parse(fs.readFileSync(`./vault_abi/${net}_${vault}.json`, 'utf8'));
  let contract = new w3.eth.Contract(abi, address);
  let vaultCount = await contract.methods.vaultCount().call();
  console.log(`vault count ${vaultCount}`);
  vaultDebtCeiling = await contract.methods.getDebtCeiling.call();
  console.log(`debt ceiling: ${vaultDebtCeiling}`);
  currentDebt = 0;
  for(var i= 0; i<vaultCount;i++){
    d = await contract.methods.vaultDebt(i).call();
    currentDebt += d;
  }
    debt[net] = {vault: {'debt_ceiling': vaultDebtCeiling}};
    debt[net][vault] = {'total_debt': currentDebt};
    console.log(`debt ${currentDebt}`);
}

async function searchVaults(){
  var debt = new Object();
  var address;
  var abi;
  var contract;
  var vaultCount;
  var vaultDebtCeiling;
  var currentDebt;
  for (var vault in vaults){
    console.log(`vault: ${vault}`)
    address = vaults[vault];
    abi = JSON.parse(fs.readFileSync(`./vault_abi/${net}_${vault}.json`, 'utf8'));
    contract = new w3.eth.Contract(abi, address);
    vaultCount = await contract.methods.vaultCount().call();
    console.log(`vault count ${vaultCount}`);
    vaultDebtCeiling = await contract.methods.getDebtCeiling.call();
    console.log(`debt ceiling: ${vaultDebtCeiling}`);
    currentDebt = 0;
    for(var i= 0; i<vaultCount;i++){
      d = await contract.methods.vaultDebt(i).call();
      currentDebt += d;
    }
    debt[net] = {vault: {'debt_ceiling': vaultDebtCeiling}};
    debt[net][vault] = {'total_debt': currentDebt};
    console.log(`debt ${currentDebt}`);
    
  }
  fs.writeFileSync('./debts.json', JSON.stringify(debt));
}



searchVaults();
