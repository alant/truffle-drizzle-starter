Aiming to make an intuitive starter project that utilizes popular frameworks for easy dapp development. 

## build steps
1. migrate the contract
```bash
truffle migrate
```
2. link contract build directory to react client
I've only verified the following on MacOS. 
```bash
# For MacOS and Linux
cd client/src
ln -s ../../build/contracts contracts

# For Windows 7, 8 and 10
# Using a Command Prompt as Admin

cd client/src
mklink \D contracts ..\..\build\contracts
```