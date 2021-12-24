import json
polygon_vaults = """MATIC Vault
0xa3fa99a148fa48d14ed51d610c367c61876997f1
WETH Vault
0x3fd939B017b31eaADF9ae50C7fF7Fa5c0661d47C
LINK Vault
0x61167073E31b1DAd85a3E531211c7B8F1E5cAE72
AAVE Vault
0x87ee36f780ae843A78D5735867bc1c13792b7b11
CRV Vault
0x98B5F32dd9670191568b661a3e847Ed764943875
BAL Vault
0x701A1824e5574B0b6b1c8dA808B184a7AB7A2867
dQUICK Vault
0x649Aa6E6b6194250C077DF4fB37c23EE6c098513
WBTC Vault
0x37131aEDd3da288467B6EBe9A77C523A700E6Ca1
GHST Vault
0xF086dEdf6a89e7B16145b03a6CB0C0a9979F1433
camWMATIC Vault
0x88d84a85A87ED12B8f098e8953B322fF789fCD1a
camWETH Vault
0x11A33631a5B5349AF3F165d2B7901A4d67e561ad
camAAVE Vault
0x578375c3af7d61586c2C3A7BA87d2eEd640EFA40
camWBTC Vault
0x7dda5e1a389e0c1892caf55940f5fce6588a9ae0
camDAI Vault
0xD2FE44055b5C874feE029119f70336447c8e8827"""

polygon_vaults = polygon_vaults.replace("Vault","")
polygon_vaults = polygon_vaults.replace(" ","")
polygon_vaults = polygon_vaults.split('\n')
polygon_vaults = dict(zip(polygon_vaults[0::2], polygon_vaults[1::2]))

with open('polygon_vaults.json', 'w') as fp:
    json.dump(polygon_vaults,fp)

fantom_vaults = """WFTM Vault
0x1066b8FC999c1eE94241344818486D5f944331A0
WETH Vault
0xD939c268C49c442F037E968F045ba02f499562D4
yvWFTM Vault
0x7efB260662a6FA95c1CE1092c53Ca23733202798
yvDAI Vault
0x682E473FcA490B0adFA7EfE94083C1E63f28F034
BTC Vault
0xE5996a2cB60eA57F03bf332b5ADC517035d8d094
LINK Vault
0xd6488d586E8Fcd53220e4804D767F19F5C846086
SUSHI Vault
0x267bDD1C19C932CE03c7A62BBe5b95375F9160A6
AAVE Vault
0xdB09908b82499CAdb9E6108444D5042f81569bD9
mooScreamFTM
0x3609A304c6A41d87E895b9c1fd18c02ba989Ba90
mooScreamETH
0xC1c7eF18ABC94013F6c58C6CdF9e829A48075b4e
mooScreamBTC
0x5563Cc1ee23c4b17C861418cFF16641D46E12436
mooScreamLINK
0x8e5e4D08485673770Ab372c05f95081BE0636Fa2
mooScreamDAI
0xBf0ff8ac03f3E0DD7d8faA9b571ebA999a854146"""

fantom_vaults = fantom_vaults.replace("Vault","")
fantom_vaults = fantom_vaults.replace(" ","")
fantom_vaults = fantom_vaults.split('\n')
fantom_vaults = dict(zip(fantom_vaults[0::2], fantom_vaults[1::2]))

with open('fantom_vaults.json', 'w') as fp:
    json.dump(fantom_vaults,fp)