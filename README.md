Aiming to make an intuitive starter project that utilizes popular frameworks for easy dapp development. 

## build steps
1. migrate the contract
```bash
truffle migrate
```
2. link contract build directory to react client

I verified the following on only MacOS and Ubuntu Linux. 
```bash
# For MacOS and Linux
cd client/src
ln -s ../../build/contracts contracts

# For Windows 7, 8 and 10
# Using a Command Prompt as Admin

cd client/src
mklink \D contracts ..\..\build\contracts
```

3. Run / build the react client 
```bash
# the folling commands run in client dir

# run the client
npm run start
# build the client
npm run build
```
