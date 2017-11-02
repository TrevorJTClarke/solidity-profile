pragma solidity ^0.4.15;

contract User {

  // Name of the contract
  string public userName;
  uint public skillsTotal = 0;
  address owner;

  // Used to keep track of skills
  mapping(uint => Skill) public skills;
  uint[] public skillKeys;

  struct Skill {
    bool exists;
    bool active;
    bytes32 name;
    address admin;
    address[6] endorsed;
    uint256 achieved; // percent represented in 0-100
  }

  modifier onlyExisting(uint _idx) {
    if (!skills[_idx].exists) revert();
    _;
  }

  modifier onlyOwner {
    if (msg.sender != owner) revert();
    _;
  }

  function User(string _userName) {
    userName = _userName;
    owner = msg.sender;
  }

  event SkillAdded(bytes32 name);
  event SkillEndorsed(address endorsed);

  // Series of getter functions for contract data
  function getSkillCount() constant returns(uint) {
    return skillsTotal;
  }

  function returnSkill (uint _idx) constant onlyExisting(_idx) public returns(bytes32, bool, address, address[6], uint256) {
    Skill memory m = skills[_idx];
    return (m.name, m.active, m.admin, m.endorsed, m.achieved);
  }

  // Well this is fudged for now, maybe change later
  function removeSkill (uint _idx) public {
    delete skills[_idx];
    delete skillKeys[_idx];
    skillsTotal--;
  }

  // Function to add a skill to the contract
  function addSkill(bytes32 name, address _endorsed, uint256 achieved) onlyOwner public {
    // Don't allow the same skill to be added twice
    if (skills[skillsTotal].exists) revert();

    Skill memory newSkill;
    newSkill.name = name;
    newSkill.exists = true;
    newSkill.active = true;
    newSkill.admin = msg.sender;
    newSkill.achieved = achieved;
    newSkill.endorsed[0] = _endorsed;

    skills[skillsTotal] = newSkill;
    skillKeys.push(skillsTotal);
    SkillAdded(name);
    skillsTotal++;
  }

  // Function to add a skill to the contract
  function addEndorsement(uint idx, uint slot, address _endorsed) public {
    // Don't allow endorsement on empty skill
    if (_endorsed == owner) revert();
    /*require(skills[idx]);*/
    require(idx >= 0);
    require(slot >= 0 && slot <= 6);

    // NOTE: Allows myself to endorse all the times :/
    // NOTE: Can slot be automated without upper bound loop? (IDEA: key mapping of current incr)
    skills[idx].endorsed[slot] = _endorsed;
    SkillEndorsed(_endorsed);
  }

}
