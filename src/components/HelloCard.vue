<template>
  <div class="hello">
    <template v-if="userName">
      <div class="card hello-card">
        <div class="hello-title">
          <h1>Hello</h1>
          <h4>My Name is</h4>
        </div>
        <div>
          <h2>{{userName}}</h2>
          <hr>
          <div class="skills">
            <small>Endorsed Skills</small>
            <div v-for="item in skills">
              <skill :data="item"/>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="card">
        <h1>No User Found :(</h1>
      </div>
    </template>
    <div class="card card-help">
      <h3>What is this?</h3>
      <p>This is a demo of Solidity & Vue.js<br><br>This is a smart contract that stores a user, some skills and endorements assigned to each skill. The purpose is to create verifiable skills based on peer accredidation for a given user.</p>
      <h3>How do I use it?</h3>
      <p>You will need metamask! Please download here: <a href="https://metamask.io/" target="_blank">MetaMask</a>. Once you have installed and opened an account, please change to the Rinkeby Network. This will allow you to interact with this page!</p>
    </div>
  </div>
</template>

<script>
import Skill from '@/components/Skill'
import defaultData from '@/components/hellocard.json'
import { mapGetters, mapActions } from 'vuex'
// const debug = true
const debug = false

export default {
  name: 'dashboard',
  data () {
    return (debug) ? defaultData : {}
  },
  computed: {
    ...mapGetters(['userName', 'skills'])
  },
  mounted () {
    this.mountUserContract(this.address)
  },
  methods: {
    ...mapActions(['mountUserContract'])
  },
  components: {
    Skill
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

.hello-card {
  border-bottom: 5px solid $error;
  border-radius: 5px;
  max-width: 500px;
  margin-bottom: 60px;
}

.hello-title {
  background: $error;
  border-radius: 5px 5px 0 0;
  padding: 10px 0;
}

h1, h4 {
  color: $white;
  font-weight: normal;
  display: block;
  margin: 0;
}

h1 {
  font-size: 45pt;
  font-weight: 500;
  line-height: 45pt;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

h2 {
  color: $secondary;
  font-size: 45pt;
  font-family: monospace;
  font-weight: 400;
  margin: 0;
  padding: 10px 0 0;
}

h3 {
  display: block;
  font-size: 18pt;
  margin: 0;
  padding: 20px 0 0;
}

h4 {
  font-size: 16pt;
  line-height: 12pt;
  letter-spacing: 0.05em;
  text-transform: lowercase;
}

hr {
  border: 0px;
  border-top: 1px solid rgba(0,0,0,0.1);
  display: inline-block;
  margin: 0;
  width: 80%;
}

.skills {
  padding: 10px;

  small {
    display: block;
    margin-bottom: 5px;
  }

  div {
    display: inline-block;
    margin-right: 5px;
  }
}
</style>
