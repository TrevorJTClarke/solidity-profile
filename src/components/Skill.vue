<template>
  <div class="skill" :title="endorsedVerbage">
    <span>{{name}}</span>
    <i v-bind:style="{ background: getEndorsements() }"></i>
  </div>
</template>

<script>

export default {
  name: 'skill',
  props: ['data'],
  data () {
    return {
      name: '',
      endorsed: [],
      totalEndorsed: 0,
      achieved: 0
    }
  },
  mounted () {
    this.name = this.data.name
    this.endorsed = this.data.endorsed
  },
  computed: {
    endorsedVerbage () {
      if (!this.totalEndorsed || this.totalEndorsed <= 0) return 'Endorse this skill!'
      return `${this.totalEndorsed} Endorsement${(this.totalEndorsed !== 1) ? 's' : ''}`
    }
  },
  methods: {
    colorHex (hex) {
      return (hex) ? `#${hex.slice(-6)}` : '#f2f2f2'
    },
    getEndorsements () {
      if (!this.endorsed || this.endorsed.length <= 0) return

      // Calculate percentages
      // NOTE: Must check if there are any "empty" definitions, IE 0x00000....
      let _this = this
      let total = 0
      let incr = 0

      this.endorsed.forEach((i) => {
        if (parseInt(i) !== 0) total++
      })
      incr = Math.round(100 / total)
      this.totalEndorsed = total

      // Assign background & colors based on hex
      let curr = 0
      let colors = ''
      this.endorsed.forEach((e) => {
        if (parseInt(e) === 0) return
        let hex = _this.colorHex(e)
        colors += `${hex} ${curr}%, ${hex} ${(curr + incr - 1 === 99) ? 100 : curr + incr - 1}%,`
        curr += incr
      })

      // Full background assembled
      return `linear-gradient(to right,${colors.substring(0, colors.length - 1)})`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

.skill {
  border: 1px solid transparentize($primary, .4);
  display: inline-block;
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  span {
    cursor: default;
    display: block;
    line-height: 12pt;
    font-size: 9pt;
    font-weight: 600;
    padding: 2px 10px 3px;
    position: relative;
    text-transform: uppercase;
    transition: color 220ms ease;
    z-index: 3;
  }

  i {
    background: #a6a6a6;
    display: block;
    height: 3px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transition: height 220ms ease;
    filter: grayscale(1);
    z-index: 1;
  }

  &:hover {

    span {
      color: white;
      text-shadow: 0px 1px 1px #333;
    }

    i {
      height: 22px;
      filter: grayscale(0);
    }
  }
}
</style>
