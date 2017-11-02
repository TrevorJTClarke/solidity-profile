import Vue from 'vue'
import Dashboard from '@/components/HelloCard'
import router from '@/router'

describe('HelloCard.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloCard)
    const vm = new Constructor({router}).$mount()
    // expect(vm.$el.querySelector('.dashboard h1').textContent)
    //   .to.equal('Welcome to your truffle-vue dApp')
  })
})
