# :computer: pTokens dapp

The pTokens dapp

&nbsp;

***

&nbsp;

## :exclamation: Important

At the moment there are a lot of inconsistencies within the code because of differences within ptokens.js The only supported pToken is pBTC (for now)

&nbsp;

***

&nbsp;

### :house_with_garden: Setting the environment:

Clone the __`ptokens-dapp`__ repo

```
git clone https://github.com/provable-things/ptokens-dapp.git
```

Switch into the __`ptokens-dapp`__:

```
cd ptokens-dapp
```

Install dependencies:

```
npm install
```

&nbsp;

***

&nbsp;

### :guardsman: Tests:

Start __`ptokens-dapp tests`__ to see al test results via:

```
npm test
```

&nbsp;

***

&nbsp;

### :wrench: Development:

Before running it you must clone __`ptokens.js`__, build it and copy all packages within this __`node_modules `__
folder (it's not a good solution but make it easy to develop in paraller both __`ptokens.js`__ and __`ptokens-dapp`__)


Start __`ptokens-dapp`__ via:

```
npm start
```

It is possible to run tests in __`development mode`__ in order to don't see all the messages:

```
npm run test-dev
```

&nbsp;

***

&nbsp;

### :exclamation: 

This is the pToken id mapping. Changing these values could cause a lot of errors

* __0__ : __pbtc-on-eth-mainnet__
* __1__ : __pbtc-on-eth-testnet__
* __2__ : __pbtc-on-eos-testnet__