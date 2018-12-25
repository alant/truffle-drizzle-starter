var SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract('SimpleStorage', function(accounts) {
  it("...should start with the value 0.", async function() {
    let simpleStorage = await SimpleStorage.deployed();
    let storedData = await simpleStorage.storedData_();
    assert.equal(storedData.valueOf(), 0, "0 wasn't stored in contract");
  });
  it("...should store the value 89.", async function() {
    let simpleStorage = await SimpleStorage.deployed();
    await simpleStorage.set(89, {from: accounts[0]});
    let storedData = await simpleStorage.storedData_();
    assert.equal(storedData.valueOf(), 89, "89 wasn't stored in contract");
  });
})
