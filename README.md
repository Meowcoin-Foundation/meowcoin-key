# Meowcoin-key

Generate Meowcoin addresses from a mnemonic phrase following the standards BIP32, BIP39, BIP44.

That is, use your 12 words to get addresses for Meowcoin mainnet.


## Example get external and internal (change) addresses by path

A simple and "spot on" way to generate/derive addresses.

If you need brutal performance check out getAddressByPath example below.

```javascript
import MeowcoinKey from "@meowcoin-foundation/meowcoin-key";
//Or import as CommonsJS module
//const MeowcoinKey = require("@meowcoin-foundation/meowcoin-key");

const mnemonic = MeowcoinKey.generateMnemonic();
const ACCOUNT = 0; //default is zero
const POSITION = 0; //the first address for this wallet
const network = "mewc"; //Meowcoin mainnet
const addressPair = MeowcoinKey.getAddressPair(
  network,
  mnemonic,
  ACCOUNT,
  POSITION
);

console.info("Mnemonic", mnemonic);

console.log(addressPair);
```

Example output:

```javascript
Mnemonic: "orphan resemble brain dwarf bus fancy horn among cricket logic duty crater"
{
  internal: {
    address: 'MVVPZUYZ5QP2xBF5e8gLLvWc2EMhksE5Ns',
    path: "m/44'/1669'/0'/1/1",
    privateKey: '4471ef22126ccb20973bf577539cc7552e99cc177af589a1a17d8d433b836f1d',
    WIF: 'HcEfqNBM6SoAmX6LQ4usM4ZDtv2FkpwFzwggtcFJbv5C3qedWM65'
  },
  external: {
    address: 'MPo9vi3QM4JqfxGxysFD8xbqFZBSzZAqeG',
    path: "m/44'/1669'/0'/0/1",
    privateKey: '91b73176c7e2ac359d5f9c5ea16750475f02346ba5c0db4b96e4c698ff3a7dc3',
    WIF: 'Hepsf5dCQfjQCPfWhcP5f275iPN6HqUS39asZwJ8mGHf9SufS9bM'
  },
  position: 1
}
```

## Example get the first public address for a wallet by BIP44 path

Note this is the fastest way to generate/derive addresses since we can re-use the hdKey object.

BUT its more technical since you have to provide the full BIP44 path.

```javascript
import MeowcoinKey from "@meowcoin-foundation/meowcoin-key";

//use MeowcoinKey.generateMnemonic() to generate mnemonic codes
const mnemonic =
  "orphan resemble brain dwarf bus fancy horn among cricket logic duty crater";
const path = "m/44'/1669'/0'/0/0";
const network = "mewc";
const hdKey = MeowcoinKey.getHDKey(network, mnemonic);

const address = MeowcoinKey.getAddressByPath(network, hdKey, path);

console.log(address);
```

Example output:

```javascript
{
  address: 'MLxh3hVWSfyGA2fu54idyDGCQzwxSafXYi',
  path: "m/44'/1669'/0'/0/0",
  privateKey: '3f44c830e10662c86dc1a3c503935c8c2326242cbd2c1fcad71bf4c94e64fcc8',
  WIF: 'HYemMdnXHRLdDfPiTnfvqfCEjKBRsivt3iKUQbv4kQHmDqajDKwU'
}
```

## How to import into your project

### ES6 module

```javascript
//As ES6 module
import MeowcoinKey from "@meowcoin-foundation/meowcoin-key";
```

### CommonsJS module

```javascript
//As CommonsJS module
const MeowcoinKey = require("@meowcoin-foundation/meowcoin-key");
```

### Browserify

```html
<!-- A browserified version, with all the dependencies bundled for the web -->
<html>
  <body>
    <script src="./node_modules/@meowcoin-foundation/meowcoin-key/dist/MeowcoinKey.js"></script>
    <script>
      alert(MeowcoinKey.generateMnemonic());
    </script>
  </body>
</html>
```

## install

` npm install @meowcoin-foundation/meowcoin-key`

## build

` npm run build`

## test

`npm test`

Note, the tests run on the built version, so you need to build before you run the tests

## BIP32

> BIP32 is the specification which introduced the standard for hierarchical deterministic (HD) wallets and extended keys to Bitcoin. Deterministic wallets can generate multiple "child" key pair chains from a master private "root" key in a deterministic way.[5][6] With the adoption of this standard, keys could be transferred between wallet software with a single extended private key (xprv), greatly improving the interoperability of wallets.

Quote from: https://en.m.wikipedia.org/wiki/Bitcoin_Improvement_Proposals#BIP32

Source: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki

## BIP39

> BIP39 is a proposal describing the use of plain language words chosen from a specific word list,[8] and the process for using such a string to derive a random seed used to generate a wallet as described in BIP32. This approach of utilizing a mnemonic phrase offered a much more user friendly experience for backup and recovery of cryptocurrency wallets.

Quote from: https://en.m.wikipedia.org/wiki/Bitcoin_Improvement_Proposals#BIP39

Source: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki

## BIP44

> BIP44 defines a logical hierarchy for deterministic wallets based on an algorithm described in BIP32 and purpose scheme described in BIP43. It allows the handling of multiple coins, multiple accounts, external and internal chains per account and millions of addresses per chain

Quote from: https://en.m.wikipedia.org/wiki/Bitcoin_Improvement_Proposals#BIP44

Source: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki

`m / purpose' / coin_type' / account' / change / address_index`

So in the case of Meowcoin the path m/44'/1669'/0'/0/0 says "give me the first address"

The first part m/44'/1669' says that the purpose is to use BIP44 with Meowcoin (1669). Consider that static code.

Accounts is deprecated and should be 0

Change: should be 0 or 1, 0 for external addresses and 1 for the change address

### Address gap limit

> Address gap limit is currently set to 20. If the software hits 20 unused addresses in a row, it expects there are no used addresses beyond this point and stops searching the address chain. We scan just the external chains, because internal chains receive only coins that come from the associated external chains.
>
> Wallet software should warn when the user is trying to exceed the gap limit on an external chain by generating a new address.

Source: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
