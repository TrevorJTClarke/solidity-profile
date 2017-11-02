var User = artifacts.require("./User.sol");

contract('User', function(accounts) {

  describe("contract initial state tests", function() {
    let me;
    before(async function() {
      me = await User.new('Trevor');
      console.log('me.address', me.address)
    });

    it("should have the user name 'Trevor'", async function() {
      const name = await me.userName()
      assert.equal(name, "Trevor")
    })

    it("can add skill", async function() {
      const inst = await me.addSkill('Solidity', web3.eth.coinbase, 80);
      assert.equal(inst.logs.length, 1);
    });

    it("should find the new skill", async function() {
        const mySkill = await me.returnSkill(0);
        assert.equal(web3.toUtf8(mySkill[0]), 'Solidity'); // skill name
        assert.equal(mySkill[1], true); // active
        assert.equal(mySkill[2], web3.eth.coinbase); // admin
        assert.equal(mySkill[3][0], web3.eth.coinbase); // endorsed
        assert.equal(mySkill[4].c[0], 80); // achieved
    });

    it("should count all skills", async function() {
        // count only 1
        const allSkills = await me.getSkillCount();
        assert.equal(allSkills.c[0], 1);

        // count multiple
        await me.addSkill('Solidity', web3.eth.coinbase, 40);
        await me.addSkill('Javascript', web3.eth.coinbase, 90);
        await me.addSkill('Sass', web3.eth.coinbase, 85);
        await me.addSkill('Bullshit', web3.eth.coinbase, 34);
        const moreSkills = await me.getSkillCount();
        assert.equal(moreSkills.c[0], 5);
    });

    it("should remove a skill", async function() {
        await me.removeSkill(4); // removes bullshit ;)
        // NOTE: def could beef up test here
        const moreSkills = await me.getSkillCount();
        assert.equal(moreSkills.c[0], 4);
    });

    it("should add an endorsement", async function() {
        // Only allows others to endorse
        await me.addEndorsement(0, 1, accounts[1]); // adds a new endorsement
        const mySkill = await me.returnSkill(0);
        assert.equal(mySkill[3][1], accounts[1]);
    });
  });


});
