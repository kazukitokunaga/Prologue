<template>
  <div>
    <h1>Prologue...</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from '../plugins/axios'

export default {
  name: 'App',
  data() {
    return {
      message: ''
    }
  },
  async created() {
    const res = await axios.get('api')
    this.message = res.data.message
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="sass">
h1 {
  color: blue;
}
</style>
