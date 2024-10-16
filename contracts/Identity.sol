// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 < 0.9.0;

contract Identity{

    address public owner;

    struct user {
        uint uid;
        uint id;
        string name;
        string email;
    }

    constructor(){
        owner = msg.sender;
    }

    mapping (uint => user) public users;

    mapping (uint => bool ) isidused;

    modifier alreadyusedID(uint _uid ) {
        require(!isidused[_uid], "This id already exists");
        _;
    }

    function adduser(uint _uid, uint _id , string memory _name, string memory _email ) public  alreadyusedID(_uid){
        users[_uid] = user(_uid,_id,_name, _email);
        isidused[_uid]=true;
    }

    function verifybyUID(uint _uid) public view returns (bool) {
        return isidused[_uid];
    }

}