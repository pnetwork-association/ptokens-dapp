# :computer: pTokens dapp

The pTokens dapp

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

### :wrench: Development:

Before running it you must clone __`ptokens.js`__, build it and copy all packages within this __`node_modules `__
folder (it's not a good solution but make it easy to develop in paraller both __`ptokens.js`__ and __`ptokens-dapp`__)


Start __`ptokens-dapp`__ via:

```
npm start
```

&nbsp;

***

&nbsp;

### :rocket: Deploy:

Create an env __`.env`__ containing the following values:

```
HOST=
USERNAME=
SUDO_PASSWORD=
PATH=
PRIVATE_KEY_PATH=
WEBSITE_FOLDER_PATH=
```