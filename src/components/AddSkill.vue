<template>
  <div class="add-skill">
    <input type="text" name="new_skill" :model="name" placeholder="Add Skill">
    <button>+</button>
  </div>
</template>

<script>

export default {
  name: 'addskill',
  data () {
    return {
      name: null
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

.add-skill {
  border: 1px solid transparentize($primary, .4);
  display: inline-block;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}
</style>
