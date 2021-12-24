require('dotenv').config();
const { Telegraf } = require('telegraf');
const getVaultDebtCeiling = require('./debt_monitor').getVaultDebtCeiling;
const fs = require('fs');

const valid_networks = ['polygon', 'fantom']

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
  ctx.reply('Qi Dao Debt Monitor Bot');
});

bot.help((ctx) => {
  console.dir({ctx})
  ctx.reply('/vaultdebtceiling (network name) (vault name)\n/networknames /vaultnames (network name)')
});

bot.command('vaultdebtceiling', async (ctx) => {
  console.log(ctx.message.text)
  let cmd, net,vaults;
  [cmd, net, vault] = ctx.message.text.split(" ");
  console.log(`${net} ${vault}`);
  if (!valid_networks.includes(net)) {
    ctx.reply(`${net} is not a valid network.\ntype /networknames to see valid networks`);
    return;
  }
  vaults = getvaults(net);
  if (!vaults.includes(vault)){
    ctx.reply(`${vault} is not a valid vault\n type /vaultnames (network name) to see valid vault names`);
    return;
  }
  ctx.reply(`${await getVaultDebtCeiling(net,vault)} MAI`);

});

bot.command('allvaults', (ctx) => {

});

bot.command('vaultnames', (ctx) => {
  [cmd, net] = ctx.message.text.split(" ");
  if (!valid_networks.includes(net)) {
    ctx.reply(`${net} is not a valid network.\ntype /networknames to see valid networks`);
    return;
  }
  ctx.reply(`vaults: ${getvaults(net)}`);
});
bot.launch()


function getvaults(net){
  const all_vaults = fs.readdirSync('./vault_abi');
  let vaults = [];
  for (i in all_vaults) {
    let vault = all_vaults[i];
    if(vault.split('_')[0] == net){
      vaults.push(vault.split('_')[1].split('.')[0]);
    }
  }
  return vaults;
}