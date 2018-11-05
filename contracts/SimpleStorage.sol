pragma solidity ^0.4.24;

contract SimpleStorage {
  event StorageSet(
    uint _val,
    string _message
  );

  uint public storedData_;

  constructor() public {
    storedData_ = 0;
  }

  function set(uint _x) public {
    storedData_ = _x;

    emit StorageSet(_x, "Data stored successfully!");
  }
}
