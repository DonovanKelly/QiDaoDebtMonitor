"use strict";

const assert = require('assert');
const dbt_mon = require('../debt_monitor');
const fs = require('fs');

describe('get debt ceiling', () => {
    it(`should get the debt ceiling for a specified vault and network`, async () => {
        assert.strictEqual(typeof await dbt_mon.getVaultDebtCeiling('fantom', 'WETH'), 'number');
        
    });
    
});
